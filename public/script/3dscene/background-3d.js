class Background3D extends Scene3D{
    constructor(canvasSelector){
        super(canvasSelector);
        // インスタンシング用
        this.instancedMesh = null;
        this.instancingNum = 800;
    }

    async initialize(){

        super.initialize();

        // レンダラーを作成
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(this.canvasSelector),
            alpha: true,
            antialias: true
        });

        // レンダラーの設定
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.initRenderWidth, this.initRenderHeight);
        let nightMode = localStorage.getItem('night-mode');
        if(nightMode == 'on'){
            this.renderer.setClearColor(0x000000);
        }else{
            this.renderer.setClearColor(0xffffff);
        }
        
        // カメラの位置調整
        this.camera.position.set(1, -1, 8);
        this.camera.rotation.set(0, 0, 0);

        // カメラ制御
        this.cameraControl.autoRotate = true;
        this.cameraControl.autoRotateSpeed = 10;

        // フォグ
        if(nightMode == 'on'){
            this.scene.fog = new THREE.Fog(0x000000, 0, 20);
        }else{
            this.scene.fog = new THREE.Fog(0xffffff, 0, 20);
        }

        // 画面サイズの変更時のレイアウト崩れを防止
        window.addEventListener('resize', this.onResizeWindow.bind(this));
        this.onResizeWindow();

        // インスタンシング
        let obj = await this.loadModels('./3dmodel/+.glb');
        this.instancing(obj.children[0]);

        // 回転アニメーション
        createjs.Ticker.timingMode = createjs.Ticker.RAF; // フレームレート設定
        createjs.Tween.get(this.cameraControl)
            .to({autoRotateSpeed: 0.05}, 2000, createjs.Ease.cubicOut);

        // ナイトモード
        $('#night-mode').on('click', ()=>{
            let nightMode = localStorage.getItem('night-mode');
            let color;
            if(nightMode == 'on'){
                color = 0xffffff;
                localStorage.setItem('night-mode', 'off');
            }else{
                color = 0x000000;
                localStorage.setItem('night-mode', 'on');
            }
            this.renderer.setClearColor(color);
            this.scene.fog = new THREE.Fog(color, 0, 20);
        });

        // コンテンツ表示
        $('#contents-mode').on('click', ()=>{
            $('#content').addClass('hidden');
        });
    }

    // 画面サイズの変更時のレイアウト崩れを防止
    onResizeWindow(){
        var width = window.innerWidth;
        var height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( width, height );
    }

    // インスタンシング
    instancing(mesh){
        this.instancedMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material, this.instancingNum);
        
        var matrix = new THREE.Matrix4();
        for ( var i = 0; i < this.instancingNum; i ++ ) {
            this.randomizeMatrix(matrix);
            this.instancedMesh.setMatrixAt(i, matrix);
        }

        this.scene.add(this.instancedMesh);
    }

    // 位置のランダム生成
    randomizeMatrix(matrix) {

        let position = new THREE.Vector3();
        position.x = Math.random() * 10 - 5;
        position.y = Math.random() * 10 - 5;
        position.z = Math.random() * 10 - 5;

        let rotation = new THREE.Euler();
        rotation.x = Math.PI / 2;
        rotation.y = Math.PI;
        rotation.z = Math.PI;
        let quaternion = new THREE.Quaternion();
        quaternion.setFromEuler(rotation);

        let scale = new THREE.Vector3();
        scale.x = scale.y = scale.z = 7;

        matrix.compose( position, quaternion, scale );
    }
}