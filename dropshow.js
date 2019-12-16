/**
 * dropshow.js
 * Since 2019-12-15 15:32:32
 * @author しふたろう
 * ver 0.0.4
 *
 */
window.onload=function(){
	let doc = document, body = document.body
	;
	 let ns = 'http://bitchunk.net';
	 let cv = doc.createElement('canvas'), ct
	 let imglist = doc.createElement('ol');
	 let intervalTime = 8000;
	 let fadeTime = 1800;
	ct = cv.getContext('2d');
	cv.width = body.clientWidth;
	cv.height = body.clientHeight;


	imglist.seekIndex = 0;
//	body.appendChild(doc.createElement('div'));
	body.appendChild(imglist)

	 cv.onmousemove = function(e)
 	{

 	};

 	function dragoverFile(e)
 	{
 		e.preventDefault();
 	}
 	function dropFile(e)
 	{
 		var i, data = e.dataTransfer
 			, reader = new FileReader()
 			, arrowTypes = ['image/png', 'image/jpeg', 'image/gif']
 			, filedata
 			;
 		e.preventDefault();
 		for(i = 0; i < data.files.length; i++){
 			filedata = data.files[i];
 			if(arrowTypes.indexOf(filedata.type) == -1){
 				return;
 			}
 			reader.readAsDataURL(filedata);
			reader.name = filedata.name;
// 			recter.name = filedata.name;
 		}
 		reader.onload = function(e){
 			let img = new Image();

			img.onload = function(){
				let el = body.firstElementChild;
				let li = doc.createElement('li');
				li.appendChild(img);
				li.id = imglist.childElementCount;
				li.style.opacity = 1;
				imglist.appendChild(li);
				body.insertBefore(li.cloneNode(true), imglist);
				if(body.childElementCount > 3){
					body.removeChild(body.firstElementChild);
				}
//				imglist.seekIndex = imglist.childElementCount - 1;
	//			console.log(imglist.seekIndex);
 			};
 			img.src = e.target.result;
			img.name = reader.name;
		};

		let ins = body.querySelectorAll('.adsbygoogle');
		for (let i = 0; i < ins.length; i++){
			body.removeChild(ins[i]);
		}
 	}

 	body.ondrop = dropFile;
 	body.ondragover= dragoverFile;
	body.onclick = startShow;

/**
 * @name startShow
 *
 * @return {[type]} [description]
 *
 */

	function startShow(){
		body.replaceChild(imglist.children[imglist.seekIndex].cloneNode(true), body.firstElementChild);
		fadeShow();
	}

	function waitShow(){
		body.timer = setTimeout(function(){
			body.reqa = requestAnimationFrame(fadeShow)
		}, intervalTime);
		body.onclick = stopShow;
		imglist.style.bottom = -imglist.clientHeight + 'px';
		body.firstElementChild.style.opacity = 1;
	}

	function stopShow(){
		clearTimeout(body.timer);
		cancelAnimationFrame(body.reqa);
		imglist.style.bottom = 0;
		body.onclick = startShow;

	}

	function fadeShow(){
		let el = body.firstElementChild;
		let nx = el.nextElementSibling;
		let d = 1 / (fadeTime / 16.67);
		nx.style.opacity = Math.max(parseFloat(nx.style.opacity) - d, 0);
		if(nx.style.opacity == 0){
			imglist.seekIndex = (imglist.seekIndex + 1) % imglist.childElementCount;
			body.removeChild(imglist.previousElementSibling);
			body.insertBefore(imglist.childNodes[imglist.seekIndex].cloneNode(true), body.firstElementChild);
//			imglist.seekIndex = (imglist.seekIndex + 1) % imglist.querySelectorAll('img').length;
			waitShow();
			return;
		}
		body.reqa = requestAnimationFrame(fadeShow);
	}



	function loadCanvas(img){
	}
 };
