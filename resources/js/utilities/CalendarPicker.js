import 'jquery-ui/ui/widgets/datepicker.js';
import { Observable } from 'rxjs';
import Helpers from "./helpers";

function getDaysArray(start, end) {
    let arr=[];
    for(arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};
function renderButtons(input, id){
    //create buttons / week, month, year
    let buttonPane = $(input, id).datepicker("widget").find(".ui-datepicker-buttonpane");
    let btn = $('<button class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" type="button">'+lang['This week']+'</button>');
    btn.unbind("click").bind("click", function () {
        $("#"+id).val(lang['This week']);
        $("#"+id).datepicker( "hide" );

    });
    buttonPane.html(btn)

    let btn2 = $('<button class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" type="button">'+lang['This month']+'</button>');
    btn2.unbind("click").bind("click", function () {
        $("#"+id).val(lang['This month']);
        $("#"+id).datepicker( "hide" );

    });
    btn2.appendTo(buttonPane);

    let btn3 = $('<button class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" type="button">'+lang['This year']+'</button>');
    btn3.unbind("click").bind("click", function () {
        $("#"+id).val(lang['This year']);
        $("#"+id).datepicker( "hide" );

    });
    btn3.appendTo(buttonPane);

    //change color of date range
    if($("#"+id).val().includes(' - ')){
        let firstDate = $("#"+id).val().split(' - ')[0].split('/').reverse().join('-')
        let secondDate = $("#"+id).val().split(' - ')[1].split('/').reverse().join('-')
        let daylist = getDaysArray(firstDate,secondDate);
        daylist = daylist.map((date)=>{
            let dd = date.getDate() + 1;
            let mm = date.getMonth();
            let yyyy = date.getFullYear();
            return [dd,mm,yyyy];
        });
        daylist.forEach(element => {
            $('[data-year="'+element[2]+'"][data-month="'+element[1]+'"]').find('a[data-date="'+element[0]+'"]').addClass('ui-state-active');
        });
    }
}
class CalendarPicker {
    createCalendar(id, selectRange, showButtonPanel = true){
        return new Observable((subscriber) => {
            $(function() {

                $("#"+id).datepicker({
                    dateFormat: locationFormats.date_format ? locationFormats.date_format.toLowerCase().replace(/[dmy]/g, '$&$&') : 'dd/mm/yy',
                    showButtonPanel: showButtonPanel,
                    onSelect: function( selectedDate ) {
                        if(selectRange){ // if selectRange mode is on -> choose init date and end date
                            if(!$(this).data().datepicker.first){
                                $(this).data().datepicker.inline = true
                                $(this).data().datepicker.first = selectedDate;
                            }else{
                                if((new Date(Helpers.unFormatDate(selectedDate))) > (new Date(Helpers.unFormatDate($(this).data().datepicker.first)))){
                                    $(this).val($(this).data().datepicker.first+" - "+selectedDate);
                                }else{
                                    $(this).val(selectedDate+" - "+$(this).data().datepicker.first);
                                }
                                $(this).data().datepicker.inline = false;
    
                                subscriber.next($(this).val());
                            }
                        }
                    },
                    onClose:function(){
                        subscriber.next($(this).val());

                        delete $(this).data().datepicker.first;
                        $(this).data().datepicker.inline = false;
                    },
                    beforeShow: function (input) {
                        setTimeout(function () {
                            renderButtons(input, id);
        
                        }, 1);
                    },
                    onUpdateDatepicker: function (input) {
                        setTimeout(function () {  
                            renderButtons(input, id);

                        }, 1);
                    },
                });
                $("#"+id).datepicker('show');
            });
        })
    }
}
export default new CalendarPicker();