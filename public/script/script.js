const main = async ()=>{
    initializeTabs();

    initializeForms();

    let background3D = new Background3D('#background-3d');
    background3D.initialize();

    let meisi3D = new Meisi3D('#meisi-3d');
    meisi3D.initialize();

}

// ページ切り替えのタブ
const initializeTabs = ()=>{

    // パラメータを読み取ってコンテンツを切り替える
    const url = new URL(location);
    let param = url.searchParams.get('p');
    changeTabs(param ? param : 'top');

    // タブクリックの挙動
    $('.tab').on('click', e=>{
        // クエリパラメータ取得
        const url = new URL(location);
        let param = null;//url.searchParams.get('p');
        // クエリ生成
        const id = $(e.currentTarget).attr('id');
        switch(id){
            case 'top_tab':
                url.searchParams.delete('p');
                break;
            case 'illust_tab':
                param = 'illust';
                break;
            case '3dcg_tab':
                param = '3dcg';
                break;
            case 'web_tab':
                param = 'web';
                break;
            case 'game_tab':
                param = 'game';
                break;
        }
        // URL 書きかえ
        let paramStr = param ? '?p=' + param : url;
        history.replaceState('','', paramStr);
        // コンテンツ切り替え
        changeTabs(param ? param : 'top');
    });
}

const changeTabs = tab=>{

    // 全部非表示に
    $('.page').addClass('hidden');
    $('.tab').addClass('mb-1')
        .removeClass('mr-1')
        .removeClass('ml-1');

    switch(tab){
        case 'top':
            $('#top').removeClass('hidden');
            $('#top_tab').removeClass('mb-1')
                .addClass('mr-1');
            break;
        case 'illust':
            $('#illust').removeClass('hidden');
            $('#illust_tab').removeClass('mb-1')
                .addClass('ml-1')
                .addClass('mr-1');
            break;
        case '3dcg':
            $('#3dcg').removeClass('hidden');
            $('#3dcg_tab').removeClass('mb-1')
                .addClass('ml-1')
                .addClass('mr-1');
            break;
        case 'web':
            $('#web').removeClass('hidden');
            $('#web_tab').removeClass('mb-1')
                .addClass('ml-1')
                .addClass('mr-1');
            break;
        case 'game':
            $('#game').removeClass('hidden');
            $('#game_tab').removeClass('mb-1')
                .addClass('ml-1');
            break;
    }
}

// お問い合せフォーム初期化
const initializeForms = ()=>{
    $(()=>{
        $("#form").validate({
            rules: {
                "entry.1410079106": {
                    required: true
                },
                "entry.703543454": {
                    required: true,
                    email: true
                },
            },
            messages: {
                "entry.1410079106": {
                    required: "※必須項目です."
                },
                "entry.703543454": {
                    required: "※必須項目です."
                },
            },
            submitHandler: function (form) {
                form.submit();
            }
        });
    });
}

// お問合せフォームの送信が押された後
const onSubmitted = ()=>{
    $('#thanks').removeClass('hidden');
}

$(main);