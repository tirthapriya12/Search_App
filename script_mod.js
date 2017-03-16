
window.addEventListener('load', function () {

    var content = document.getElementById('content');
    var globalContentPrevious = '';
    var Search_btn = document.getElementById('Search');
    var Search_txt = document.getElementById('searchtext');
    var srch_status = document.getElementById('status');
    var match_str = '';
    var ignorecase = document.getElementById('ignorecase');
    
    srch_status.innerText="";
    srch_status.style.display='none';
    /*function storeContentToLocalStorage() {
        if (typeof (Storage) !== "undefined" && localStorage.getItem("username") === null) {
            // Code for localStorage.

            //stores content text data in the LS if not present previously.       
            localStorage.setItem("content", content.innerText);

        }
        else {
            // Sorry! No Web Storage support..
            console.log('Sorry! No Web Storage support..');
        }
    }//end of storeContentToLocalStorage()

    storeContentToLocalStorage();*/

    //get the text data back from LocalStorage
    /*function getContentFromLocalStorage() {

        if (typeof (Storage) !== "undefined") {
            // Code for localStorage.

            //gets data from the LS stored with a key content       
            globalContentPrevious = localStorage.getItem("content", content.innerText);

        }
        else {
            // Sorry! No Web Storage support..
            console.log('Sorry! No Web Storage support..');
        }

    }   //end 

    getContentFromLocalStorage(); */

    globalContentPrevious=content.innerText // taking backup of the content 



    /*Adding event Listener on Click Button which fires a function 'onClickSearchButtonHandle' to handle click 
    and  take search input 
    from the textBox.
    */
    Search_btn.addEventListener('click', onClickSearchButtonHandle, false);
    Search_txt.addEventListener('keydown', respondToKeypress, false);

    function respondToKeypress(event) {



        if (event.keyCode == '13') {

            match_str = getsearchText();
            if(match_str!=" " && match_str!='')
            {
                    if (ignorecase.checked == true) 
                    {
                            checkPresenceIgnoreCase(match_str);
                             }
                    else {
                                checkPresence(match_str);
                             }
                }          
         }



    }//end of respondToKeypress


    function onClickSearchButtonHandle() {

        match_str = getsearchText();
        if(match_str!=" "&& match_str !='')
      {  
        if (ignorecase.checked == true)// if ignore case is checked 
        {
            checkPresenceIgnoreCase(match_str);
        }
        else {
            checkPresence(match_str);
        }

      }
    }// end of onClickSearchButtonHandle



    /*function to get Text from the text box and returns a string that it extracted that is to be searched to
      checkPresence*/
    function getsearchText() {
        var match = Search_txt.value;

        return match;
    } //end of getsearchText()

    //gets input using getsearchText() using onClickSearchButtonHandle() or respondToKeypress() and calls highlightText()
    function checkPresenceIgnoreCase(match) {

        content.innerHTML = globalContentPrevious;
        if (match != ''|| Search_txt.value !== ' ') {
            if (globalContentPrevious) {

                var contentstrIgnoreCase = globalContentPrevious;


            }

            match = match.toLowerCase();
            contentstrIgnoreCase = contentstrIgnoreCase.toLowerCase();
            contentstrIgnoreCase = contentstrIgnoreCase.split('');
            var matched = [], j = 0, i = 0, flag = 0;
            //gets the string to be searched
            

            //len=match.length;
            while (i < contentstrIgnoreCase.length) {
                var matcher = contentstrIgnoreCase.slice(i, i + match.length);
                matcher = matcher.join('');
                /*document.getElementById('output').innerHTML =*///console.log( matcher);
                if (matcher.indexOf(match) != -1) {
                    console.log(matcher + ' ' + i);
                    matched[j++] = i;
                    i = i + match.length + 1; // incrment i by the length of matching string
                    flag = 1;

                }
                else {
                    i++;
                }


            

           }
            if (!flag) {
                console.log('not found');
                srch_status.style.display='inline';
                srch_status.innerText = 'not found';
            }

            else {
                highlightText(matched, match, globalContentPrevious.split('')); //to add <mark> to highlight   the found texts
                srch_status.style.display='inline';
                srch_status.innerText = 'found';
            }

        }





    }



    //gets input using getsearchText() and calls highlightText()
    function checkPresence(match) {
        content.innerHTML = globalContentPrevious;
        if (match != ''|| Search_txt.value !== ' ') {
            if (globalContentPrevious) {

                var contentstr = globalContentPrevious;


            }

            


            contentstr = contentstr.split('');
            var matched = [], j = 0, i = 0, flag = 0;
            //gets the string to be searched
            

            //len=match.length;
            while (i < contentstr.length) {
                var matcher = contentstr.slice(i, i + match.length);
                matcher = matcher.join('');
                /*document.getElementById('output').innerHTML =*///console.log( matcher);
                if (matcher.indexOf(match) != -1) {
                    console.log(matcher + ' ' + i);
                    matched[j++] = i;
                    i = i + match.length + 1; // incrment i by the length of matching string
                    flag = 1;

                }
                else {
                    i++;
                }


                
             }   
            if (!flag) {
                console.log('not found');
                srch_status.innerText = 'not found';
                srch_status.style.display='inline';
            }

            else {
                highlightText(matched, match, contentstr); //to add <mark> to highlight   the found texts
                srch_status.innerText = 'found';
                srch_status.style.display='inline';
                 }

            
        }
    }  // end of checkPresence()



    





    //adds <mark> where search string is found
    function highlightText(matched, match, contentstr) {

        var i = 0,
            j = 0,
            len = match.length;

        for (i = 0; i < matched.length; i++) {
            /*if (matched[i] == 0) {
                contentstr.splice(matched[i], 0, '<mark>');
            }*/
            /*else {*/
                contentstr.splice(matched[i] + j , 0, '<mark>');
            //}
            //console.log(str);
            //str[matched[i]]='<mark>';
            //str[matched[i+match.length]]='</mark>';
            console.log('End' + (matched[i] + len));

            contentstr.splice(matched[i] + len + 1 + j, 0, '</mark>');

            console.log(matched[i] + len);

            len = match.length;

            j = j + 2;  // counter to get the increased count of the search content after adding <mark> & </mark>

        }   //end of loop

        contentstr = contentstr.join('');

        updatehighLight(contentstr);//  to write back the paragraph to show highlight

    } //end of highlightText()






    //writes back the content with highlight or <mark> tag.
    function updatehighLight(contentstr) {

        content.innerHTML = contentstr;

    }



});