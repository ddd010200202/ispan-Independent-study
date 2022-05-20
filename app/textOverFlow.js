$('tr').on('click',function(){
    if($(this).find('td').css('word-break')=='normal'){
        $(this).find('td').css({//可以改變多個css
    "word-break":"break-all",
    'white-space': 'normal'

    })
    }else{
        $(this).find('td').css({
    "word-break":"normal",
    'white-space': 'nowrap'
    })
    }
})