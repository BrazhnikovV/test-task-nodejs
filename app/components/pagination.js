/**
 * pagination - 
 */
var pagination = {

    /** 
     * @var array - Количество кнопок в пагинации
     * @access  {private}
     */
    count_pgn_buttons: 5,

    /**
     * getObj - инициализирует работу плагина
     * 
     * @access  {public}
     * @param   {integer}   cnt_elements - общее количество элементов
     * @param   {integer}   cur_page - номер текущей страницы
     * @param   {integer}   count_prods_on_page - количество элементов на странице
     * @return  {object}
     */
    getObj: function( cnt_elements, cur_page, count_prods_on_page ){
        console.log('### Call =pagination= method => getObj');

        let out_pgn = {};        
        out_pgn.next_disabled = '';
        out_pgn.prev_disabled = '';
        out_pgn.cur_page = cur_page; 
        out_pgn.cnt_buttons = Math.ceil( cnt_elements / count_prods_on_page );

        if ( cur_page === out_pgn.cnt_buttons ) {            
            out_pgn.next = -1;
            out_pgn.next_disabled = 'disabled';
        }
        else {
            out_pgn.next = cur_page + 1;  
        }
    
        if ( cur_page === 1 ) {
            out_pgn.prev = -1;
            out_pgn.prev_disabled = 'disabled';
        }
        else {
            out_pgn.prev = cur_page - 1;
        }

        return out_pgn;
    }
};

module.exports = pagination;
