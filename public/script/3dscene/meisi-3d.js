class Meisi3D extends Scene3D{
    constructor(canvasSelector){
        super(canvasSelector);
    }

    async initialize(){

        super.initialize();

        // レンダラーの設定
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.initRenderWidth, this.initRenderHeight);
        this.renderer.setClearColor(0xffffff, 0);

        // テクスチャが濃く表示される対策
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        // カメラの位置調整
        this.camera.position.set(0, 0, 2);
        this.camera.rotation.set(0, 0, 0);

        // 画面サイズの変更時のレイアウト崩れを防止
        window.addEventListener('resize', this.onResizeWindow.bind(this));
        this.onResizeWindow();

        // モデルの追加
        let obj = await this.loadModels('./3dmodel/meisi.glb');
        
        // スライドイン
        createjs.Ticker.timingMode = createjs.Ticker.RAF; // フレームレート設定
        obj.position.y = 2;
        createjs.Tween.get(obj.position)
            .to({y: 0}, 1000, createjs.Ease.cubicOut);

        this.scene.add(obj);
    }

    // 画面サイズの変更時のレイアウト崩れを防止
    onResizeWindow(){
        var width = $(this.canvasSelector).parent().width();
        var height = $(this.canvasSelector).parent().height();
        
        $(this.canvasSelector).width(width);
        $(this.canvasSelector).height(height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( width, height );
    }

    // モデルのロード（オーバーライド）
    loadModels(path){
        return new Promise((resolve, reject)=>{
            this.modelLoader.load(path, data=>{
                let obj = data.scene;
                // 縮小フィルターの変更
                obj.traverse (o=>{
                    if (o.isMesh){
                        o.material.map.minFilter = THREE.LinearFilter;
                    }
                });
                resolve(obj);
            });
        });
    }

    async slideIn(obj){
        await wait(2000);
        obj.position.y += 100;
    }

}

const wait = (milisec)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, milisec);
    });
}