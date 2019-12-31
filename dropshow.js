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
	 let droprect = doc.createElement('div');
	 let intervalTime = 8000;
	 let fadeTime = 1800;
	 let dragElement = null;
	ct = cv.getContext('2d');
	cv.width = body.clientWidth;
	cv.height = body.clientHeight;


	imglist.seekIndex = 0;
//	body.appendChild(doc.createElement('div'));
	body.appendChild(droprect);
	body.appendChild(imglist);

	//  cv.onmousemove = function(e)
 	// {
	//
 	// };

 	function dragoverFile(e){
 		e.preventDefault();
 	}

 	function dropFile(e)
 	{
 		var i, data = e.dataTransfer
 			, reader
 			, arrowTypes = ['image/png', 'image/jpeg', 'image/gif', 'text/url']
 			, filedata
			, files
		;
		e.preventDefault();

		let ins = body.querySelectorAll('.adsbygoogle');
		for (let i = 0; i < ins.length; i++){
			body.removeChild(ins[i]);
		}
		files = data.getData('url');
		if (files.length > 0) {
			loadImg(files);
			return;
		}
		files = data.files;
 		for(i = 0; i < files.length; i++){
 			filedata = files[i];
 			if(arrowTypes.indexOf(filedata.type) == -1){
 				return;
 			}
			reader = new FileReader()
 			reader.readAsDataURL(filedata);
			reader.name = filedata.name;
			reader.onload = function(e){
				loadImg(e.target.result, reader.name);
			};
// 			recter.name = filedata.name;
 		}

 	}

	function loadImg(src, name){
		let img = new Image();
		img.onload = function(){
			let el = body.querySelector('body>li');
			let li = doc.createElement('li');
			li.appendChild(img);
			li.id = imglist.childElementCount;
			li.style.opacity = 1;
//			li.draggable = true;
			imglist.appendChild(li);
			body.insertBefore(li.cloneNode(true), imglist);
			if(body.querySelectorAll('body>li').length > 2){
				body.removeChild(body.querySelector('body>li'));
				body.querySelector('body>li').style.opacity = 0;
			}
		};
		// img.draggable = false;
		img.onmousedown = function(e){dragElement = e.target;};
		img.src = src;
		img.name = name ? name : src.replace(/.*\/+?(.*)/,'$1');
	}

	function dropremoveFile(e){
		var data = e.dataTransfer
		// drop Same Element
		e.preventDefault();
		if (dragElement){
			dragElement.parentElement.parentElement.removeChild(dragElement.parentElement);
			imglist.seekIndex = 0;
			dragElement = null;
			e.stopPropagation();
			return false;
		}
		return true;
	}

	function dragremoveFile(e){
		var data = e.dataTransfer
		;
		if (dragElement){
			dragElement.style.height = '50%';
			dragElement.style.margin = '50% 0';
		}
	}

	function swapFile(e){
		if (dragElement){
			dragElement.style.height = '100%';
			dragElement.style.margin = '0';
		}
//		e.stopPropagation();
		e.stopPropagation();
		e.preventDefault();
		return false;
	}

	function swappingFile(e){
		if (dragElement){
			dragElement.style.height = '100%';
			dragElement.style.margin = '0';
		}
		e.stopPropagation();
		e.preventDefault();
		return false;
	}


 	body.ondrop = dropFile;
	body.ondragover= dragoverFile;
	body.onclick = startShow;
	imglist.ondrop = swapFile;
	imglist.ondragover = swappingFile;
//	imglist.ondragleave = dragleaveFile;
droprect.ondragover = dragremoveFile;
droprect.ondrop = dropremoveFile;

/**
 * @name startShow
 *
 * @return {[type]} [description]
 *
 */

	function startShow(){
		imglist.style.height = '0';
		body.replaceChild(imglist.children[imglist.seekIndex].cloneNode(true), body.querySelector('body>li'));
		fadeShow();
	}

	function waitShow(){
		body.timer = setTimeout(function(){
			body.reqa = requestAnimationFrame(fadeShow)
		}, intervalTime);
		body.onclick = stopShow;
//		imglist.style.bottom = -imglist.clientHeight + 'px';
//		body.firstElementChild.style.opacity = 1;
		body.querySelector('body>li').style.opacity = 0;
	}

	function stopShow(){
		clearTimeout(body.timer);
		cancelAnimationFrame(body.reqa);
		imglist.style.height = '22%';
		body.onclick = startShow;
	}

	function fadeShow(){
		let el = body.querySelector('body>li');
		let nx = el.nextElementSibling;
		let d = parseFloat(1 / (fadeTime / 16.67));
		let cl;
		nx.style.opacity = Math.max(parseFloat(nx.style.opacity) - d, 0);
		el.style.opacity = Math.min(parseFloat(el.style.opacity) + d, 1);
		if(el.style.opacity == 1){
			imglist.seekIndex = (imglist.seekIndex + 1) % imglist.childElementCount;
			body.removeChild(imglist.previousElementSibling);
			cl = imglist.childNodes[imglist.seekIndex].cloneNode(true);
			body.insertBefore(cl, body.querySelector('body>li'));
			cl.draggable = false;
			cl.onmousedown = function(e){return false;};
//			imglist.seekIndex = (imglist.seekIndex + 1) % imglist.querySelectorAll('img').length;
			waitShow();
			return;
		}
		body.reqa = requestAnimationFrame(fadeShow);
	}



	function loadCanvas(img){
	}
 };
