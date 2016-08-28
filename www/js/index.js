/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 page B---pagebeforeload

 page B---pageload

 page B---pagebeforecreate

 page B---pagecreate

 page B---pageinit

 page A---pagebeforehide

 page B---pagebeforeshow

 page A---pageremove

 page A---pagehide

 page B---pageshow

 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log(id);
        console.log(device);
        //alert(device.uuid);
        function playAudio(url) {
            alert("playAudio on "+url);
            var my_media = new Media(url,
                // success callback
                function () { console.log("playAudio():Audio Success"); },
                // error callback
                function (err) { console.log("playAudio():Audio Error: " + err); }
            );
            // Play audio
            my_media.play();
        }

        //senderID: "553559042102"

        $.getScript( "lib/jqm/jquery.mobile-1.4.5.js" )
            .done(function( script, textStatus ) {
                $.getScript('js/jqm.page.params.js');
            })
            .fail(function( jqxhr, settings, exception ) {
                alert("Errore caricamento jquery mobile");
            });
        //checkConnessione();

    //------- (i) start app here -----//

//(i) inizializzazione
        function print_r(printthis, returnoutput) {
            var output = '';

            if($.isArray(printthis) || typeof(printthis) == 'object') {
                for(var i in printthis) {
                    output += i + ' : ' + print_r(printthis[i], true) + '\n';
                }
            }else {
                output += printthis;
            }
            if(returnoutput && returnoutput == true) {
                return output;
            }else {
                alert(output);
            }
        }

//global vars


        var secret="";
        var nomeUtenteLoggato="";
        var idUser="";
        var idOspite="";

        var md5_eventi      ="";
        var md5_leader      ="";
        var md5_viaggi      ="";
        var md5_materiali   ="";
        var md5_incaricati  ="";
        var md5_ospiti      ="";
        var leader_first_time=0;
        var viaggi_first_time=0;
        var ospiti_first_time=0;
        var materiali_first_time=0;

        if (window.localStorage.getItem('codiceUtente')>0) {
        } else {
            logoutfunction();
        }

        function inizializzazione_variabili(){
            secret="jk08lasit76hnjvm98hnj46ukjbfadksdfas";
            nomeUtenteLoggato=window.localStorage.getItem('nome');
            $(".iduserval").html(nomeUtenteLoggato);
            idUser=window.localStorage.getItem('idUser');
            idOspite=window.localStorage.getItem('idOspite');

            md5_eventi      =window.localStorage.getItem('md5_eventi');
            md5_leader      =window.localStorage.getItem('md5_leader');
            md5_viaggi      =window.localStorage.getItem('md5_viaggi');
            md5_incaricati  =window.localStorage.getItem('md5_incaricati');
            md5_ospiti      =window.localStorage.getItem('md5_ospiti');
            md5_materiali   =window.localStorage.getItem('md5_materiali');

            if (window.localStorage.getItem('platino')=='si') {
                $("#btn-incaricati").show();
            } else {
                $("#btn-incaricati").hide();
            }

        }

// End boilerplate code.

//(f) inizializzazione

        $(document).on("mobileinit", function (event, ui) {
            $.mobile.defaultPageTransition = "slide";

            $('#page-index').on('pageshow',function() {
                inizializzazione_variabili();

                var initial = '#page-index';
                if(window.localStorage.getItem('idUser')>0) {
                    initial = '#page-index-logged';
                }
                if(window.localStorage.getItem('idOspite')>0) {
                    initial = '#page-index-logged';
                }
                $.mobile.navigate(initial);
            });
        });

// ---------------------------------------------------------------------------------------------------------------
//(i) menu delle pagine, funzioni particolari per le singole pagine
// ---------------------------------------------------------------------------------------------------------------
        $(document).on("pagecontainerbeforeshow", function (event, ui) {
            if (typeof ui.toPage == "object") {
                switch (ui.toPage.attr("id")) {
                    case "page-index":
                        var idUser=window.localStorage.getItem('idUser');
                        var idOspite=window.localStorage.getItem('idOspite');
                        var initial = '#page-index';
                        if(idUser>0) {
                            initial = '#page-index-logged';
                            $.mobile.navigate(initial);
                        }
                        if(idOspite>0) {
                            initial = '#page-index-logged';
                            $.mobile.navigate(initial);
                        }
                        break;
                    case "page-index-logged":
                        var idUser=window.localStorage.getItem('idUser');
                        var idOspite=window.localStorage.getItem('idOspite');
                        var initial = '#page-index';
                        if (idUser>0) {
                            initial = '#page-index-logged';
                        } else if (idOspite>0) {
                            initial = '#page-index-logged';
                        } else {
                            $.mobile.navigate(initial);
                        }
                        break;
                    case "page-n21":
                        $( "#popupMap iframe" )
                            .attr( "width", 0 )
                            .attr( "height", 0 );

                        $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                            .css( { "width" : 0, "height" : 0 } );

                        $( "#popupMap" ).on({
                            popupbeforeposition: function() {
                                var size = scale( 480, 320, 0, 1 ),
                                    w = size.width,
                                    h = size.height;

                                $( "#popupMap iframe" )
                                    .attr( "width", w )
                                    .attr( "height", h );

                                $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                                    .css( { "width": w, "height" : h } );
                            },
                            popupafterclose: function() {
                                $( "#popupMap iframe" )
                                    .attr( "width", 0 )
                                    .attr( "height", 0 );

                                $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                                    .css( { "width": 0, "height" : 0 } );
                            }
                        });

                        break;
                }
            }
        });
// ---------------------------------------------------------------------------------------------------------------
//(f) menu delle pagine, funzioni particolari per le singole pagine
// ---------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------
// (i) bottone logout
// ---------------------------------------------------------------------------------------------------------------

        function logoutfunction() {
            window.localStorage.removeItem('idUser');
            window.localStorage.removeItem('idOspite');
            window.localStorage.removeItem('nome');
            window.localStorage.removeItem('codiceUtente');
            window.localStorage.removeItem('platino');
            window.localStorage.removeItem('superuser');
            window.localStorage.removeItem('amministratore');
            window.localStorage.removeItem('permessi_incaricato');
            window.localStorage.removeItem('md5_eventi');
            window.localStorage.removeItem('eventi_memoria');
            window.localStorage.removeItem('md5_leader');
            window.localStorage.removeItem('leader_memoria');
            window.localStorage.removeItem('md5_viaggi');
            window.localStorage.removeItem('viaggi_memoria');
            window.localStorage.removeItem('md5_materiali');
            window.localStorage.removeItem('materiali_memoria');
            window.localStorage.removeItem('md5_incaricati');
            window.localStorage.removeItem('incaricati_memoria');
            window.localStorage.removeItem('md5_ospiti');
            window.localStorage.removeItem('ospiti_memoria');
            window.localStorage.removeItem('pageleaderoffset');
            inizializzazione_variabili();
        }

        $(".logout-button").click(function(){
            logoutfunction();
        });
// ---------------------------------------------------------------------------------------------------------------
// (f) bottone logout
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------
// (i) pagina calendario, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------
        $(".btn-calendario").click(function(){
            //alert("Eccomi premuto eventi");
            //alert("id_utente:"+idUser);
            $.mobile.loading( 'show', {
                text: 'Loading',
                textVisible: true,
                theme: 'a',
                textonly: false,
                html: ''
            });
            var resp=[];
            var params={};

            if (window.localStorage.getItem("idUser")>0) {
                params.id_utente=window.localStorage.getItem("idUser");
            }
            if (window.localStorage.getItem("idOspite")>0) {
                params.id_ospite=window.localStorage.getItem("idOspite");
            }
            params.secret=secret;
            if (window.localStorage.getItem("md5_eventi")) {
                params.md5=window.localStorage.getItem("md5_eventi");
            }

            $.ajax({
                dataType: "json",
                type: 'POST',
                url: "https://www.diamondsclub.it/api/eventi.php",
                data: jQuery.param(params) ,
                success: function (data) {
                    //alert("SUCCESS!");
                    resp=data.resp;
                    md5_eventi=data.md5;
                    window.localStorage.setItem("md5_eventi",md5_eventi);
                    window.localStorage.setItem("eventi_memoria",JSON.stringify(resp));
                },
                error: function (e) {
                    //alert("Connessione assente oppure nessun aggiornamento, uso i dati in memoria!");
                    resp=JSON.parse(window.localStorage.getItem("eventi_memoria"));
                },
                complete: function () {
                    $('#eventi_listview').listview();
                    $('#eventi_listview').html('');
                    //alert("FATTO!");
                    var htmlcalendario='';
                    for (i=0;i<resp.length;i++) {
                        ev=resp[i];
                        var arr = ev.data.split('-');
                        var data_evento=arr[2] + "/" + arr[1]+"/"+arr[0];
                        arr = ev.ora.split(':');
                        var ora_inizio_evento=arr[0] + ":" + arr[1];
                        arr = ev.ora_fine_evento.split(':');
                        var ora_fine_evento=arr[0] + ":" + arr[1];

                        var ora_evento=ora_inizio_evento;

                        if (ora_fine_evento!=":") {
                            ora_evento=ora_inizio_evento+" - "+ora_fine_evento;
                        }
                        htmlcalendario ="<li data-role='list-divider'>"+data_evento+"</li>";
                        htmlcalendario+="<li><a href='index.html'>";
                        htmlcalendario+="<h3>"+ev.titolo+"</h3>";
                        htmlcalendario+="<p><strong>"+ev.utente.nome+' '+ ev.utente.cognome+"</strong></p>";
                        htmlcalendario+="<p>"+ev.descrizione+"</p>";
                        htmlcalendario+="<p class='ui-li-aside'><strong>"+ora_evento+"</strong></p>";
                        htmlcalendario+="</a></li>";
                        $('#eventi_listview').append(htmlcalendario);
                    }
                    $('#eventi_listview').listview('refresh');
                    $.mobile.navigate("#page-calendario");
                }
            });
        });

        $("#page-calendario").on( "pageshow", function(event){
            $.mobile.loading( 'hide');
        });

// ---------------------------------------------------------------------------------------------------------------
// (f) pagina calendario, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------
// (i) pagina leader, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------
        $("#btn-leader").click(function(){
            window.localStorage.removeItem('pageleaderoffset');
            //leader_first_time++;
            //alert(leader_first_time);
            //alert("Eccomi premuto leader");
            //alert("id_utente:"+idUser);
            $.mobile.loading( 'show', {
                text: 'Loading',
                textVisible: true,
                theme: 'a',
                textonly: false,
                html: ''
            });
            var resp=[];
            var params={};

            if (window.localStorage.getItem("idUser")>0) {
                params.id_utente=window.localStorage.getItem("idUser");
            }
            if (window.localStorage.getItem("idOspite")>0) {
                params.id_ospite=window.localStorage.getItem("idOspite");
            }
            params.secret=secret;
            if (window.localStorage.getItem("md5_leader")) {
                params.md5=window.localStorage.getItem("md5_leader");
            }

            $.ajax({
                dataType: "json",
                type: 'POST',
                url: "https://www.diamondsclub.it/api/leaders.php",
                data: jQuery.param(params) ,
                success: function (data) {
                    //alert("SUCCESS!");
                    resp=data.resp;
                    tipi=data.tipi;
                    md5_leader=data.md5;
                    window.localStorage.setItem("md5_leader",md5_leader);
                    window.localStorage.setItem("leader_memoria",JSON.stringify(resp));
                    window.localStorage.setItem("tipileader_memoria",JSON.stringify(tipi));
                },
                error: function (e) {
                    //alert("Connessione assente oppure nessun aggiornamento, uso i dati in memoria!");
                    resp=JSON.parse(window.localStorage.getItem("leader_memoria"));
                    tipi=JSON.parse(window.localStorage.getItem("tipileader_memoria"));
                },
                complete: function () {
                    $('#leader_listview').listview();
                    $('#leader_listview').html('');
                    //$('#leader_popups').html('');
                    //alert("FATTO!");
                    //print_r(tipi);
                    //print_r(resp);
                    var htmlcalendario='';
                    var htmlpopup='';

                    for (j=0;j<tipi.length;j++) {
                        var tipo=tipi[j];
                        //alert(tipo);
                        if (resp[tipo]) {
                            var leader=resp[tipo];
                            //print_r(leader);
                            for (i=0;i<leader.length;i++) {
                                lead=leader[i];
                                //print_r(lead);
                                htmlcalendario ="<li data-role='list-divider'><h3>"+lead.titolo_leader+"</h3></li>";
                                //htmlcalendario+="<li><a data-rel='popup' href='#popupLeader"+j+"-"+i+"'>";
                                htmlcalendario+="<li><a href='#' datatipo='"+j+"' dataleader='"+i+"' class='btn-leader-dettaglio'>";
                                htmlcalendario+="<img src='http://www.diamondsclub.it/uploads_foto_utenti/thumbs/crop_"+lead.foto_leader+"'>";
                                htmlcalendario+="<p><strong>"+lead.tipo_leader+"</strong></p>";
                                htmlcalendario+="<p><i class='fa fa-map-marker'></i> "+lead.city+"</p>";
                                htmlcalendario+="</a></li>";
                                //htmlcalendario+="</a></li>";
                                //htmlpopup ="<div data-role='popup' id='popupLeader"+j+"-"+i+"'>";

                                //htmlpopup+="<div data-role='header'><h5>"+lead.titolo_leader+"</h5><a href='#' data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right'>Close</a></div>";
                                //htmlpopup+="<div data-role='main' class='ui-content'><p class='fontsize12'>"+lead.descrizione_leader+"</p></div>";
                                //htmlpopup+="</div>";

                                $('#leader_listview').append(htmlcalendario);
                                //$('#leader_popups').append(htmlpopup);

                            }
                        } else {
                            continue;
                        }

                    }
                    $('#leader_listview').listview('refresh');
                    //if (leader_first_time>1) { $('#leader_popups').enhanceWithin(); }
                    $.mobile.navigate("#page-leader");
                }
            });
        });

        $("#page-leader").on( "pageshow", function(event){
            $.mobile.loading( 'hide');
            var pageleaderoffset=window.localStorage.getItem("pageleaderoffset");
            if (pageleaderoffset>80) {
                //alert(pageleaderoffset);
                $.mobile.silentScroll(pageleaderoffset-80);
            }
        });

// ---------------------------------------------------------------------------------------------------------------
// (f) pagina leader, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------

        $('body').on('click', 'a.btn-leader-dettaglio', function() {
            var pageleaderoffset=$(this).offset().top;
            window.localStorage.setItem("pageleaderoffset",pageleaderoffset);
            var htmldettaglio="";
            var i=$(this).attr('dataleader');
            var j=$(this).attr('datatipo');
            resp=JSON.parse(window.localStorage.getItem("leader_memoria"));
            tipi=JSON.parse(window.localStorage.getItem("tipileader_memoria"));
            var lead=resp[tipi[j]][i];
            var width=$( window ).width()-30;
            htmldettaglio ="<h3>"+lead.titolo_leader+"</h3>";
            htmldettaglio+="<img width='"+width+"' src='http://www.diamondsclub.it/uploads_foto_utenti/thumbs/crop_"+lead.foto_leader+"'>";
            htmldettaglio+="<p><strong>"+lead.tipo_leader+"</strong></p>";
            htmldettaglio+="<p><i class='fa fa-map-marker'></i> "+lead.city+"</p>";
            htmldettaglio+="<p>"+lead.descrizione_leader+"</p>";
            $("#dettaglio-leader-content").html(htmldettaglio);
            $.mobile.navigate("#page-leader-dettaglio");
        });


// ---------------------------------------------------------------------------------------------------------------
// (i) pagina viaggi, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------
        $("#btn-viaggi").click(function(){
            viaggi_first_time++;
            //alert(viaggi_first_time);
            //alert("Eccomi premuto viaggi");
            //alert("id_utente:"+idUser);
            $.mobile.loading( 'show', {
                text: 'Loading',
                textVisible: true,
                theme: 'a',
                textonly: false,
                html: ''
            });
            var resp=[];
            var params={};

            if (window.localStorage.getItem("idUser")>0) {
                params.id_utente=window.localStorage.getItem("idUser");
            }
            if (window.localStorage.getItem("idOspite")>0) {
                params.id_ospite=window.localStorage.getItem("idOspite");
            }
            params.secret=secret;
            if (window.localStorage.getItem("md5_viaggi")) {
                params.md5=window.localStorage.getItem("md5_viaggi");
            }

            $.ajax({
                dataType: "json",
                type: 'POST',
                url: "https://www.diamondsclub.it/api/viaggi.php",
                data: jQuery.param(params) ,
                success: function (data) {
                    //alert("SUCCESS!");
                    resp=data.resp;
                    md5_viaggi=data.md5;
                    window.localStorage.setItem("md5_viaggi",md5_viaggi);
                    window.localStorage.setItem("viaggi_memoria",JSON.stringify(resp));
                },
                error: function (e) {
                    //alert("Connessione assente oppure nessun aggiornamento, uso i dati in memoria!");
                    resp=JSON.parse(window.localStorage.getItem("viaggi_memoria"));
                },
                complete: function () {
                    $('#viaggi_listview').listview();
                    $('#viaggi_listview').html('');
                    //$('#viaggi_popups').html('');
                    //alert("FATTO!");
                    //print_r(tipi);
                    //print_r(resp);
                    var htmlcalendario='';
                    var htmlpopup='';

                    for (j=0;j<resp.length;j++) {
                        var viaggio=resp[j];
//                htmlcalendario ="<li><a data-rel='popup' href='#popupViaggio"+j+"'> <img src='http://img.youtube.com/vi/" + viaggio.videocode + "/sddefault.jpg'> <h2>" + viaggio.didascalia + "</h2> </a> </li>";

                        if (viaggio.tipo=='video') {
                            htmlcalendario ="<li><a class='youtube-media' href='http://www.youtube.com/embed/"+viaggio.videocode+"?autoplay=1&wmode=opaque&fs=1'> <img src='http://img.youtube.com/vi/" + viaggio.videocode + "/sddefault.jpg'> "+viaggio.didascalia+"</a> </li>";
                        }

//                htmlpopup ="<div data-role='popup' class='videopopup' id='popupViaggio"+j+"'>";
//                htmlpopup+="<div data-role='header'><h5>"+viaggio.didascalia+"</h5><a href='#' data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right'>Close</a></div>";
//                htmlpopup+="<div data-role='main' class='ui-content'><iframe type='text/html' width='auto' height='auto' src='http://www.youtube.com/embed/"+viaggio.videocode+"?html5=1' frameborder='0'> </iframe></div>";
//                htmlpopup+="</div>";

                        $('#viaggi_listview').append(htmlcalendario);
//                $('#viaggi_popups').append(htmlpopup);
                    }
                    $('#viaggi_listview').listview('refresh');
//            if (viaggi_first_time>1) { $('#viaggi_popups').enhanceWithin(); }
                    $.mobile.navigate("#page-viaggi");
                }
            });
        });

        $(".youtube-media").on("click", function (e) {
            var jWindow = $(window).width();
            if ( jWindow <= 768 ) {
                return;
            }
            $.fancybox({
                href: this.href,
                type: "iframe" // when using embed format
            });
            return false;
        });


        $("#page-viaggi").on( "pagecreate", function(){
            $(".videopopup").popup({
                beforeposition: function () {
                    $(this).css({
                        width: window.innerWidth,
                        height: window.innerHeight - 14
                    });
                },
                x: 0,
                y: 0
            });
        });


        $("#page-viaggi").on( "pageshow", function(event){
            $.mobile.loading( 'hide');
        });

// ---------------------------------------------------------------------------------------------------------------
// (f) pagina viaggi, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------
// (i) pagina materiali, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------
        $("#btn-materiali").click(function(){
            materiali_first_time++;
            window.localStorage.removeItem('pageleaderoffsetMateriali');

            //alert(viaggi_first_time);
            //alert("Eccomi premuto viaggi");
            //alert("id_utente:"+idUser);
            $.mobile.loading( 'show', {
                text: 'Loading',
                textVisible: true,
                theme: 'a',
                textonly: false,
                html: ''
            });
            var resp=[];
            var sottocat=[];
            var params={};

            if (window.localStorage.getItem("idUser")>0) {
                params.id_utente=window.localStorage.getItem("idUser");
            }
            if (window.localStorage.getItem("idOspite")>0) {
                params.id_ospite=window.localStorage.getItem("idOspite");
            }
            params.secret=secret;
            if (window.localStorage.getItem("md5_materiali")) {
                params.md5=window.localStorage.getItem("md5_materiali");
            }
            //console.log(params);

            $.ajax({
                dataType: "json",
                type: 'POST',
                url: "https://www.diamondsclub.it/api/materiali.php",
                data: jQuery.param(params) ,
                success: function (data) {
                    //alert("SUCCESS!");
                    resp=data.resp;
                    sottocat=data.sottocategorie;
                    md5_materiali=data.md5;
                    //print_r(sottocat);
                    window.localStorage.setItem("md5_materiali",md5_materiali);
                    window.localStorage.setItem("materiali_memoria",JSON.stringify(resp));
                    window.localStorage.setItem("sottocategorie_materiali_memoria",JSON.stringify(sottocat));
                },
                error: function (e) {
                    //alert("Connessione assente oppure nessun aggiornamento, uso i dati in memoria!");
                    //console.log(e);
                    resp=JSON.parse(window.localStorage.getItem("materiali_memoria"));
                    sottocat=JSON.parse(window.localStorage.getItem("sottocategorie_materiali_memoria"));
                },
                complete: function () {
                    $('#materiali_content').html('');
                    //$('#materiali_popups').html('');
                    //alert("FATTO!");
                    //print_r(tipi);
                    //print_r(sottocat);
                    $('#listview-pannello-materiali-impostazioni').listview();
                    $('#listview-pannello-materiali-impostazioni').html('');
                    var htmlcalendario='';
                    var htmlpopup='';
                    htmlpopup+="<li data-role='list-divider'>Tipo Media</li>";

                    htmlpopup+="<li>";
                    htmlpopup+="<a href='#' class='custom'>";
                    htmlpopup+="<input type='checkbox' class='impostazioni-checkbox' name='classe-video' id='classe-video' value='classe-video' checked />";
                    htmlpopup+="<label for='classe-video'>Video</label>";
                    htmlpopup+="</a>";
                    htmlpopup+="</li>";
                    htmlpopup+="<li>";
                    htmlpopup+="<a href='#' class='custom'>";
                    htmlpopup+="<input type='checkbox' class='impostazioni-checkbox' name='classe-audio' id='classe-audio' value='classe-audio' checked />";
                    htmlpopup+="<label for='classe-audio'>Audio</label>";
                    htmlpopup+="</a>";
                    htmlpopup+="</li>";
                    htmlpopup+="<li>";
                    htmlpopup+="<a href='#' class='custom'>";
                    htmlpopup+="<input type='checkbox' class='impostazioni-checkbox' name='classe-link' id='classe-link' value='classe-link' checked />";
                    htmlpopup+="<label for='classe-link'>Link</label>";
                    htmlpopup+="</a>";
                    htmlpopup+="</li>";
                    htmlpopup+="<li>";
                    htmlpopup+="<a href='#' class='custom'>";
                    htmlpopup+="<input type='checkbox' class='impostazioni-checkbox' name='classe-pdf' id='classe-pdf' value='classe-pdf' checked />";
                    htmlpopup+="<label for='classe-pdf'>Pdf</label>";
                    htmlpopup+="</a>";
                    htmlpopup+="</li>";
                    htmlpopup+="<li data-role='list-divider'>Categorie</li>";


                    for (i=0;i<sottocat.length;i++) {
                        var classedato='classe-'+sottocat[i];
                        classedato=classedato.replace(/ /g,"_");
                        //alert("Sottocategoria:"+sottocat[i]);
                        htmlpopup+="<li>";
                        htmlpopup+="<a href='#' class='custom'>";
                        htmlpopup+="<input type='checkbox' class='impostazioni-checkbox' name='classe-dato-"+i+"' id='classe-dato-"+i+"' value='"+classedato+"' checked />";
                        htmlpopup+="<label for='classe-dato-"+i+"'>"+sottocat[i]+"</label>";
                        htmlpopup+="</a>";
                        htmlpopup+="</li>";

                        archiviosottocat=resp[sottocat[i]];
                        htmlcalendario ="<div id='coll_"+classedato+"' dataid='"+classedato+"' class='categoriemateriali "+classedato+"' data-role='collapsible' data-theme='b' data-inset='false'>";
                        htmlcalendario+="<h4>"+sottocat[i]+"<span id='licount_"+classedato+"' class='ui-li-count'>"+archiviosottocat.length+"</span></h4>";
                        //htmlcalendario+="<h4>"+sottocat[i]+"</h4>";
                        htmlcalendario+="<ul id='list_"+classedato+"' data-role='listview'>";
                        for (j=0;j<archiviosottocat.length;j++) {
                            var materiale=archiviosottocat[j];
                            var tipodato='classe-'+materiale.tipo;
                            htmlcalendario+="<li class='"+tipodato+" "+classedato+"' data-role='list-divider'><h3>"+materiale.didascalia+"</h3></li>";
                            if (materiale.tipo=='video') {
                                htmlcalendario+="<li class='"+tipodato+" "+classedato+"'><a class='youtube-media' href='http://www.youtube.com/embed/"+materiale.videocode+"?autoplay=1&wmode=opaque&fs=1'> ";
                            } else {
                                htmlcalendario+="<li class='"+tipodato+" "+classedato+"'><a href='#' datasottocat='"+sottocat[i]+"' datamateriale='"+j+"' class='btn-materiale-dettaglio'>";
                            }
                            htmlcalendario+="<img src='http://www.diamondsclub.it/"+materiale.immagine+"'>";
                            htmlcalendario+="<p><strong>"+materiale.autore+"</strong></p>";
                            htmlcalendario+="<p class='ui-li-aside'><strong>"+materiale.tipo+"</strong></p>";
                            htmlcalendario+="</a></li>";
                        }
                        htmlcalendario+="</ul>";
                        htmlcalendario+="</div>";
                        $('#materiali_content').append(htmlcalendario);
//                $('#materiali_popups').append(htmlpopup);
                    }
                    $("#listview-pannello-materiali-impostazioni").append(htmlpopup);
                    $('#listview-pannello-materiali-impostazioni').listview('refresh');

                    $('#materiali_content').enhanceWithin();
                    $("[data-role=panel]").panel().enhanceWithin();
                    $.mobile.navigate("#page-materiali");
                }
            });
        });

        $("#page-materiali").on( "pagecreate", function(){
            $(".videopopup").popup({
                beforeposition: function () {
                    $(this).css({
                        width: window.innerWidth,
                        height: window.innerHeight - 14
                    });
                },
                x: 0,
                y: 0
            });
        });


        $("#page-materiali").on( "pageshow", function(event){
            $.mobile.loading( 'hide');
            var pageleaderoffset=window.localStorage.getItem("pageleaderoffsetMateriali");
            if (pageleaderoffset>80) {
                //alert(pageleaderoffset);
                $.mobile.silentScroll(pageleaderoffset-80);
            }
        });

// ---------------------------------------------------------------------------------------------------------------
// (f) pagina materiali, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------

        $('body').on('click', 'a.btn-materiale-dettaglio', function() {
            var pageleaderoffset=$(this).offset().top;
            window.localStorage.setItem("pageleaderoffsetMateriali",pageleaderoffset);
            var htmldettaglio="";
            var sottocategoria=$(this).attr('datasottocat');
            var j=$(this).attr('datamateriale');
            resp=JSON.parse(window.localStorage.getItem("materiali_memoria"));
            var materiale=resp[sottocategoria][j];

            if (materiale.tipo=='link' || materiale.tipo=='pdf') {
                window.open(materiale.risorsa, '_system');
            } else {
                var width=$( window ).width()-30;
                htmldettaglio ="<h3>"+materiale.didascalia+"</h3>";
                htmldettaglio+="<img width='"+width+"' src='http://www.diamondsclub.it/"+materiale.immagine+"'>";
                htmldettaglio+="<p><strong>"+materiale.autore+"</strong></p>";
                htmldettaglio+="<p>"+materiale.didascalia+"</p>";
                if (materiale.tipo=='audio') {
                    var urlaudio="http://www.diamondsclub.it/"+materiale.risorsa;
                    htmldettaglio+="<a href='#' class='ui-btn ui-btn-d' onclick='playAudio("+urlaudio+");'>Ascolta Audio</a>";

                    //htmldettaglio+="<audio id='successSound' src='http://www.diamondsclub.it/"+materiale.risorsa+"' type='audio/mpeg'> Your browser does not support the <code>audio</code> element </audio>";
                }
                $("#dettaglio-materiale-content").html(htmldettaglio);
                $.mobile.navigate("#page-materiali-dettaglio");
            }

        });

        $('body').on('change', '.impostazioni-checkbox', function() {
            if ($(this).prop('checked')) {
                $("."+$(this).attr('value')).show();
                $("."+$(this).attr('value')).removeClass('nascosto');
            } else {
                $("."+$(this).attr('value')).hide();
                $("."+$(this).attr('value')).addClass('nascosto');
            }
            $(".categoriemateriali").each(function(index){
                var selezionato="#list_"+$(this).attr("dataid");
                var numrelated=$(selezionato+' > li:not(.nascosto)').length;
                numrelated=numrelated/2; //ci sono due righe per ogni elemento!!
                $("#licount_"+$(this).attr("dataid")).html(numrelated);
                if (numrelated>0) {
                    $("#coll_"+$(this).attr("dataid")).show();
                } else {
                    $("#coll_"+$(this).attr("dataid")).hide();
                }
            });

        });
// ---------------------------------------------------------------------------------------------------------------
// (i) pagina elenco incaricati, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------
        $("#btn-incaricati").click(function(){
            //alert("Eccomi premuto incaricati");
            //alert("id_utente:"+idUser);
            $.mobile.loading( 'show', {
                text: 'Loading',
                textVisible: true,
                theme: 'a',
                textonly: false,
                html: ''
            });
            var resp=[];
            var params={};

            if (window.localStorage.getItem("idUser")>0) {
                params.id_utente=window.localStorage.getItem("idUser");
            }
            if (window.localStorage.getItem("idOspite")>0) {
                params.id_ospite=window.localStorage.getItem("idOspite");
            }
            params.secret=secret;
            if (window.localStorage.getItem("md5_incaricati")) {
                params.md5=window.localStorage.getItem("md5_incaricati");
            }

            $.ajax({
                dataType: "json",
                type: 'POST',
                url: "https://www.diamondsclub.it/api/elenco_incaricati.php",
                data: jQuery.param(params) ,
                success: function (data) {
                    //alert("SUCCESS!");
                    resp=data.resp;
                    md5_incaricati=data.md5;
                    window.localStorage.setItem("md5_eventi",md5_incaricati);
                    window.localStorage.setItem("incaricati_memoria",JSON.stringify(resp));
                },
                error: function (e) {
                    //alert("Connessione assente oppure nessun aggiornamento, uso i dati in memoria!");
                    resp=JSON.parse(window.localStorage.getItem("incaricati_memoria"));
                },
                complete: function () {
                    $('#incaricati_listview').listview();
                    $('#incaricati_listview').html('');
                    //alert("FATTO!");
                    var htmlcalendario='';
                    for (i=0;i<resp.length;i++) {
                        ev=resp[i];
                        htmlcalendario ="<li><a href='#' class='btnprofiloincaricati'>";
                        if (ev.ultimo_accesso!='0000-00-00 00:00:00' && ev.ultimo_accesso!='null') {
                            if (ev.stato=='attivo') {
                                htmlcalendario+="<p><strong>"+ev.nome+"</strong> ("+ev.ultimo_accesso+") </p>";
                            } else {
                                htmlcalendario+="<p>"+ev.nome+" ("+ev.ultimo_accesso+") </p>";
                            }
                        } else {
                            if (ev.stato=='attivo') {
                                htmlcalendario+="<p><strong>"+ev.nome+"</strong> </p>";
                            } else {
                                htmlcalendario+="<p>"+ev.nome+" </p>";
                            }
                        }
//                        if (ev.tel!='') {
//                            htmlcalendario+="<p><a href='tel:"+ev.tel+"'>"+ev.tel+"</a></p>";
//                        }
//                        if (ev.email!='') {
//                            htmlcalendario+="<p><a href='mailto:"+ev.email+"'>"+ev.email+"</a></p>";
//                        }
//                        if (ev.city!='Scegli Comune' && ev.city!='null') {
//                            htmlcalendario+="<p><i class='fa fa-map-marker'></i> "+ev.city+"</p>";
//                        }
                        htmlcalendario+="</a></li>";
                        $('#incaricati_listview').append(htmlcalendario);
                    }
                    $('#incaricati_listview').listview('refresh');
                    $.mobile.navigate("#page-incaricati");
                }
            });
        });

        $("#page-incaricati").on( "pageshow", function(event){
            $.mobile.loading( 'hide');
        });

// ---------------------------------------------------------------------------------------------------------------
// (f) pagina elenco incaricati, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------
// (i) pagina elenco ospiti, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------
        $(".btn-ospiti").click(function(){
            ospiti_first_time++;
            //alert("Eccomi premuto ospiti");
            //alert("id_utente:"+idUser);
            $.mobile.loading( 'show', {
                text: 'Loading',
                textVisible: true,
                theme: 'a',
                textonly: false,
                html: ''
            });
            var resp=[];
            var esiti=[];
            var params={};

            if (window.localStorage.getItem("idUser")>0) {
                params.id_utente=window.localStorage.getItem("idUser");
            }
            if (window.localStorage.getItem("idOspite")>0) {
                params.id_ospite=window.localStorage.getItem("idOspite");
            }
            params.secret=secret;
            if (window.localStorage.getItem("md5_ospiti")) {
                params.md5=window.localStorage.getItem("md5_ospiti");
            }

            $.ajax({
                dataType: "json",
                type: 'POST',
                url: "https://www.diamondsclub.it/api/elenco_ospiti.php",
                data: jQuery.param(params) ,
                success: function (data) {
                    //alert("SUCCESS!");
                    esiti=data.esiti;
                    resp=data.resp;
                    md5_ospiti=data.md5;
                    window.localStorage.setItem("md5_eventi",md5_ospiti);
                    window.localStorage.setItem("ospiti_memoria",JSON.stringify(resp));
                    window.localStorage.setItem("esiti_memoria",JSON.stringify(esiti));
                },
                error: function (e) {
                    //alert("Connessione assente oppure nessun aggiornamento, uso i dati in memoria!");
                    esiti=JSON.parse(window.localStorage.getItem("esiti_memoria"));
                    resp=JSON.parse(window.localStorage.getItem("ospiti_memoria"));
                },
                complete: function () {
                    $('#ospiti_listview').listview();
                    $('#ospiti_listview').html('');
                    $("#ospiti-esiti").html('');

                    //alert("FATTO!");
                    var htmlcalendario='';
                    var tmp_esito='';
                    for (i=0;i<resp.length;i++) {
                        ev=resp[i];
                        tmp_esito="Ospiti_"+ev.esito;
                        tmp_esito=tmp_esito.replace(/ /g,"_");
                        htmlcalendario ="<li class='Ospiti_Tutti "+tmp_esito+"'><a href='#' class='btnprofiloospiti'>";
                        if (ev.ultimo_accesso!='null') {
                            if (ev.stato=='attivo') {
                                htmlcalendario+="<p><strong>"+ev.nome+"</strong> ("+ev.ultimo_accesso+") </p>";
                            } else {
                                htmlcalendario+="<p>"+ev.nome+" ("+ev.ultimo_accesso+") </p>";
                            }
                        } else {
                            if (ev.stato=='attivo') {
                                htmlcalendario+="<p><strong>"+ev.nome+"</strong> </p>";
                            } else {
                                htmlcalendario+="<p>"+ev.nome+" </p>";
                            }
                        }
                        if (ev.city=="Scegli Comune") {
                            ev.city="";
                        }
                        htmlcalendario+="<p><i class='fa fa-map-marker'></i> "+ev.city+"</p>";
                        //if (ev.tel!='') {
                        //    htmlcalendario+="<p><a href='tel:"+ev.tel+"'>"+ev.tel+"</a></p>";
                        //}
                        //if (ev.email!='') {
                        //    htmlcalendario+="<p><a href='mailto:"+ev.email+"'>"+ev.email+"</a></p>";
                        //}
                        htmlcalendario+="</a></li>";
                        $('#ospiti_listview').append(htmlcalendario);
                    }
                    htmlesiti='<a href="#" class="btn-ospiti-esiti" datavalore="Ospiti_Tutti" data-theme="b" data-role="button">Tutti</a>';
                    for (i=0;i<esiti.length;i++) {
                        tmp_esito="Ospiti_"+esiti[i];
                        tmp_esito=tmp_esito.replace(/ /g,"_");
                        htmlesiti+='<a href="#" class="btn-ospiti-esiti" datavalore="'+tmp_esito+'" data-role="button">'+esiti[i]+'</a>';
                    }
                    $('#ospiti-esiti').append(htmlesiti);
                    if (ospiti_first_time>1) { $('#ospiti-esiti').enhanceWithin(); }

                    $('#ospiti_listview').listview('refresh');
                    $('#ospiti-esiti').enhanceWithin();
                    $.mobile.navigate("#page-ospiti");
                }
            });
        });

        $("#page-ospiti").on( "pageshow", function(event){
            $.mobile.loading( 'hide');
        });

        $('body').on('click', 'a.btn-ospiti-esiti', function() {
            esiti=JSON.parse(window.localStorage.getItem("esiti_memoria"));
            var valoreesito=$(this).attr('datavalore');
            $(".Ospiti_Tutti").hide();
            $("."+valoreesito).show();
        });


// ---------------------------------------------------------------------------------------------------------------
// (f) pagina elenco ospiti, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------
// (i) pagina nuovo prospect, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------
        $("#btn-nuovo-prospect").click(function(){
            //alert("Eccomi premuto ospiti");
            //alert("id_utente:"+idUser);
            $.mobile.loading( 'show', {
                text: 'Loading',
                textVisible: true,
                theme: 'a',
                textonly: false,
                html: ''
            });
            $("#nuovoprospect").fadeIn();
            $("#controlloindirizzo").fadeIn();
            $(".diventaospiteriq").fadeOut("slow");
            $("#nuovo_prospect_submit").show();
            $("#nuovo_ospite_submit").hide();
            $(".mexsistema").hide();
            $('#nuovoprospect')[0].reset();
            $.mobile.navigate("#page-nuovo-prospect");

        });

        $("#page-nuovo-prospect").on( "pageshow", function(event){
            $.mobile.loading( 'hide');
            $(".diventaospiteriq").hide();
            $("#data_nascita").val('');
            $("#data_contatto").val('');
            $("#data_PM").val('');
        });

        $( "#diventaospitesi" ).on( "click", function()
        {
            $(".diventaospiteriq").fadeIn("slow");
            $("#nuovo_prospect_submit").hide();
            $("#nuovo_ospite_submit").show();
        });
        $( "#diventaospiteno" ).on( "click", function()
        {
            $(".diventaospiteriq").fadeOut("slow");
            $("#nuovo_prospect_submit").show();
            $("#nuovo_ospite_submit").hide();
        });


        var myLatLng = {lat: 43.7800148, lng: 11.2059485};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!',
            //position: results[0].geometry.location,
            draggable:true,
        });
        google.maps.event.addListener(marker, 'dragend', function() {
                updateMarkerPosition(marker.getPosition());
                recupero_indirizzo(marker.getPosition(),"indirizzo","citta_google");
                map.setCenter(new google.maps.LatLng(marker.getPosition().lat(),marker.getPosition().lng()));
            }


        );

        var infowindow = new google.maps.InfoWindow({
            content: '<p>Marker Location:' + marker.getPosition() + '</p>'
        });

        function updateMarkerPosition(pos) {
            $('#lat').val(pos.lat());
            $('#lon').val(pos.lng());
        }

        $( "#controllaind" ).click(function() {

            $("#controlloindirizzo").fadeIn();
            $("#messcercaind").hide();
            var indirizzo=$("#indirizzo").val();
            var cittacerca=$("#cittacerca").val();
            var stato=$("#stato").val();
            //alert(indirizzo+ " "+ cittacerca);
            //if(indirizzo!="" && cittacerca!="" && stato!="")
            if(cittacerca!="" && stato!="")
            {
                var geocoder = new google.maps.Geocoder();
                var results = geocoder.geocode(
                    {
                        address: indirizzo+" "+ cittacerca+" "+stato
                    },
                    function callback(results){

                        var latlngbounds = new google.maps.LatLngBounds();
                        latlngbounds.extend(results[0].geometry.location);
                        var bounds = new google.maps.LatLngBounds();
                        map.setCenter(latlngbounds.getCenter());
                        map.fitBounds(latlngbounds);
                        marker.setPosition(results[0].geometry.location);
                        var listener = google.maps.event.addListener(map, "idle", function () {
                            map.setZoom(16);
                            google.maps.event.removeListener(listener);
                        });
                        recupero_indirizzo(results[0].geometry.location,"indirizzo","citta_google");
                        updateMarkerPosition(results[0].geometry.location);
                    }
                );
            }
            else
            {
                $("#messcercaind").html("<span style='border:1px solid red;color:red;padding:5px;font-weight:bold;'>Inserire Città e Stato!</span><br><br>");
                $("#messcercaind").show();
            }
        });

        $(".nuovo_prospect_submit").click(function(e){
            e.preventDefault();
            $("#secret").val(secret);
            $("#invitanteForm").val(window.localStorage.getItem("codiceUtente"));
            $("#nuovoprospect_id_utente").val(window.localStorage.getItem("idUser"));
            $.ajax({
                type: "POST",
                url: "https://www.diamondsclub.it/api/nuovoospite.php",
                data : $('#nuovoprospect').serialize(),
                dataType: "html",
                beforeSend: function()
                {
                    $("#nuovoprospect").fadeOut();
                    $("#controlloindirizzo").fadeOut();
                    $.mobile.loading( 'show');
                },
                success: function(msg)
                {
                    $.mobile.loading( 'hide');
                    if(msg.search("errore"))
                    {
                        $(".mexsistema").empty();
                        $(".mexsistema").html(msg);
                        $('.mexsistema').show();
                    }
                    else
                    {
                        $("#nuovoprospect").fadeIn();
                        $("#controlloindirizzo").fadeIn();
                        var msgnew=msg.replace("errore,", "");
                        $(".messaggioerr").empty();
                        $(".messaggioerr").html(msgnew);
                        $(".messaggioerr").fadeIn();
                    }
                },
                error: function()
                {
                    $(".messaggioerr").empty();
                    $(".messaggioerr").html("Si è verificato un errore!");
                },
            });

        });


// ---------------------------------------------------------------------------------------------------------------
// (f) pagina nuovo prospect, retrieve and deploy
// ---------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------
// (i) pagina login, login remoto e redirect
// ---------------------------------------------------------------------------------------------------------------
        $("#btn-submit-login").click(function(){
            var txt_email=$("#txt-email").val();
            var txt_password=$("#txt-password").val();
            //alert(txt_email);
            //alert(txt_password);
            //alert(secret);

            if (checkConnessione()) {
                $.mobile.loading( 'show', {
                    text: 'Loading',
                    textVisible: true,
                    theme: 'a',
                    textonly: false,
                    html: ''
                });
                $.ajax({
                    dataType: "json",
                    type: 'POST',
                    url: "https://www.diamondsclub.it/api/login.php",
                    data: "email=" + txt_email + "&secret=" + secret + "&password=" + txt_password,
                    success: function (resp) {
                        if (resp.id_utente>0) {
                            nomeUtenteLoggato=resp.nome+' '+resp.cognome;
                            window.localStorage.setItem('nome',nomeUtenteLoggato);
                            window.localStorage.setItem('idUser',resp.id_utente);
                            window.localStorage.setItem('codiceUtente',resp.codice);
                            window.localStorage.setItem('platino',resp.platino);
                            window.localStorage.setItem('superuser',resp.superuser);
                            window.localStorage.setItem('amministratore',resp.amministratore);
                            window.localStorage.setItem('permessi_incaricato',resp.permessi_incaricato);
                            window.localStorage.removeItem('idOspite');
                            $(".iduserval").html(nomeUtenteLoggato);
                            $.mobile.navigate("#page-index-logged");
                            $.mobile.loading( 'hide' );
                            inizializzazione_variabili();
                            return;
                        } else if (resp.id_ospite>0) {
                            nomeUtenteLoggato=resp.nome+' '+resp.cognome+' (o)';
                            window.localStorage.setItem('nome',nomeUtenteLoggato);
                            window.localStorage.setItem('idOspite',resp.id_ospite);
                            window.localStorage.removeItem('codiceUtente');
                            window.localStorage.removeItem('platino');
                            window.localStorage.removeItem('superuser');
                            window.localStorage.removeItem('amministratore');
                            window.localStorage.removeItem('permessi_incaricato');
                            window.localStorage.removeItem('idUser');
                            $(".iduserval").html(nomeUtenteLoggato);
                            $.mobile.navigate("#page-index-logged");
                            $.mobile.loading( 'hide' );
                            inizializzazione_variabili();
                            return;
                        } else {
                            $.mobile.loading( 'hide' );
                            alert("Errore di qualche tipo!");
                        }
                    },
                    error: function (e) {
                        $.mobile.loading( 'hide' );
                        alert("Errore: credenziali errate!");
                        console.log(e.message);
                    }
                });
            } else {
                alert("Nessuna connessione internet, non posso fare l'autenticazione!");
            }

        });
// ---------------------------------------------------------------------------------------------------------------
// (f) pagina login, login remoto e redirect
// ---------------------------------------------------------------------------------------------------------------





// GESTIONE CONNESSIONE (sembra non funzionare....)
//-------------------------------------------------
        function checkConnessione() {
            try {
                var networkstate = navigator.connection.type;
                //var networkstate = 'Connessione Wifi';
                var stato = {};
                stato[Connection.UNKNOWN]  = 'Connessione sconosciuta';
                stato[Connection.ETHERNET] = 'Connessione Ethernet';
                stato[Connection.WIFI]     = 'Connessione WiFi';
                stato[Connection.CELL_2G]  = 'Connessione Cell 2G';
                stato[Connection.CELL_3G]  = 'Connessione Cell 3G';
                stato[Connection.CELL_4G]  = 'Connessione Cell 4G';
                stato[Connection.CELL]     = 'Connessione Cell generica';
                stato[Connection.none]     = 'Nessuna connessione';

                //alert(networkstate);

                if (networkstate == 'none') {
                    console.log("Niente connessione");
                    return 0;
                } else {
                    console.log(stato[networkstate]);
                    return 1;
                }
            } catch (err) {
                console.log("Sono in locale, niente controllo connessione, e dico 0");
                return 0;
            }
        }
    //------- (f) end app here -----//

    }
};
