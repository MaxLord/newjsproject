$(document).ready(function(){    

  var X,Y

	$(document).mousemove(function(event){
		X=event.pageX
		Y=event.pageY
	})

	var div = document.createElement('div')
	div.id='thenewdivid'
	document.body.appendChild(div)
	$('#thenewdivid').css({'width':'400px','display':'none','text-align':'left','font-size':'13px','position':'absolute',
		'border': 'solid 1px gray','padding': '3px','background-color':'white','z-index':'9999'})	

	$(document).keydown(function(event){ 
		if(event.keyCode == 115){ // F4 key

			$('#thenewdivid').css({'top':Y,'left':X})
			var selection = window.getSelection().toString()

			$('#thenewdivid').empty()
			$.ajax({url:'http://10.203.116.61/sql.php?query='+encodeURIComponent(''
				+' SELECT id, text FROM  data ' 
				+' WHERE text LIKE "%'+selection+'%" ORDER BY id DESC ' 								
			),success:function(RESPONSE){RESPONSE=JSON.parse(RESPONSE)   
				$('#thenewdivid').append('<input value="Insert new row?" type=button '
					+'onclick=document.getElementById("insertnewrow").style.display="";document.getElementById('
					+'"insertnewrowbutton").style.display="";document.getElementById("insertnewrow").focus()>'
					+'<input value=Close type=button onclick=document.getElementById("thenewdivid").style.display="none"><br>'
					+'<div style="float:left;width:350px;margin-top: 3px;display:none" contenteditable="true" id=insertnewrow>'
					+selection+'<br><a onclick=window.open("'+document.URL+'")>'
					+document.URL+'</a></div>'
					+'<input id=insertnewrowbutton style="display:none" type=button value=OK><br>')

				if(RESPONSE)
					for(i in RESPONSE)
						$('#thenewdivid').append('<div contenteditable="true" '
							+' style="float:left;width:350px;margin-top: 3px;" row_id='
							+RESPONSE[i]['id']+'>'+RESPONSE[i]['text'].replace(/<script>/g,'').replace(/<\/script>/g,'')
							+'</div><input  class=updaterow row_id='+RESPONSE[i]['id']+' type=button value=OK><br><br><br>')
				else $('#thenewdivid').append('No data found')

						
			}})

			
			setTimeout(function(){

/*


				$('#thenewdivid input').keydown(function(event){
					if(event.keyCode == 13 && event.ctrlKey)
						$.ajax({url:'http://10.203.116.61/sql.php?query='+encodeURIComponent(''
							+' SELECT order_url FROM  pandaorders' 
							+' WHERE order_url LIKE "%'+$('#thenewdivid input').val()+'%" ' 								
						),success:function(RESPONSE){RESPONSE=JSON.parse(RESPONSE.substr(1,RESPONSE.length-2))   
							if(RESPONSE)
								for(i in RESPONSE)
									$('#thenewdivid').append('<textarea id=newrow>'+RESPONSE[i]['order_url']+'</textarea><br>')
							else $('#thenewdivid').append('No data found<br>'	
									+'<textarea id=newrow>'+selection+'</textarea>')								
						}})					
				})
*/

				$('#thenewdivid .updaterow').click(function(){
					var data = $('#thenewdivid div[row_id="'+$(this).attr('row_id')+'"]').html().replace(/\"/g,'\'')
					if(data && data!="<br>")
						$.ajax({url:'http://10.203.116.61/sql.php?query='+encodeURIComponent(''
							+' UPDATE data SET text="'+data+'"'
							+' WHERE id='+$(this).attr('row_id')								
						)})
					else 
						$.ajax({url:'http://10.203.116.61/sql.php?query='+encodeURIComponent(''
							+' DELETE FROM data WHERE id='+$(this).attr('row_id') 								
						)})
					$('#thenewdivid').hide()				
				})

				$('#thenewdivid #insertnewrowbutton').click(function(event){
					$.ajax({url:'http://10.203.116.61/sql.php?query='+encodeURIComponent(''
						+' INSERT INTO data (text) VALUE ("'+$('#thenewdivid #insertnewrow').html().replace(/\"/g,'\'')+'")' 								
					)})							
					$('#thenewdivid').hide()				
				})


			},400)

			$('#thenewdivid').show()
		}
})

