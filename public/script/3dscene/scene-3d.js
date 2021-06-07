class Scene3D{
    constructor(canvasSelector){
        // キャンバス関係
        this.canvasSelector = canvasSelector; // canvas のセレクター（文字列）
        this.initRenderWidth = null;
        this.initRenderHeight = null;
        
        // シーン関係
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.cameraControl = null;
        
        // モデル関係
        this.modelLoader = null;
    }

    initialize(){
        // レンダラーを作成
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(this.canvasSelector),
            alpha: true,
            antialias: true
        });

        // シーンを作成
        this.scene = new THREE.Scene();
        
        // カメラを作成
        this.camera = new THREE.PerspectiveCamera(45, this.initRenderWidth / this.initRenderHeight);

        // カメラ制御
        this.cameraControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        
        // モデルの読み込み
        this.modelLoader = new THREE.GLTFLoader();

        // 環境光追加
        const light = new THREE.AmbientLight(/*色*/0xFFFFFF, /*光の強さ*/1.0);
        this.scene.add(light);

        // // 軸を追加
        // let axes = new THREE.AxesHelper(25);
        // this.scene.add(axes);

        // update開始
        this.update();
    }

    // 毎フレーム実行される
    update(){
        this.renderer.render(this.scene, this.camera); // レンダリング
        this.cameraControl.update();
        requestAnimationFrame(this.update.bind(this));
    }

    // モデルのロード
    loadModels(path){
        return new Promise((resolve, reject)=>{
            this.modelLoader.load(path, data=>{
                let obj = data.scene;
                resolve(obj);
            });
        });
    }
    
}