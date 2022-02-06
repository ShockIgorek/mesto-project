(()=>{"use strict";var e=function(e,t,n,r){var o=e.querySelector(n);!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.classList.remove(t),e.disabled=!1}(o,r):function(e,t){e.classList.add(t),e.disabled=!0}(o,r)},t=document.querySelector(".popup_zoom"),n=t.querySelector(".popup-full-screen__photo"),r=t.querySelector(".popup-full-screen__description");function o(e){e.target.classList.contains("popup_opened")&&s(e.target)}function u(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");s(t)}}var c,a,l,i=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",u),document.addEventListener("mousedown",o)},s=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",u),document.removeEventListener("mousedown",o)},d=document.querySelector(".profile"),p=d.querySelector(".profile__name"),f=d.querySelector(".profile__description"),_=d.querySelector(".profile__button-edit"),m=d.querySelector(".profile__button-plus"),v=d.querySelector(".profile__avatar"),h=document.querySelector(".popup-edit-avatar"),y=h.querySelector(".popup-avatar"),b=document.querySelector(".popup_edit"),S=b.querySelector(".popup__input_name"),g=b.querySelector(".popup__input_description"),q=document.querySelector(".popup_add-photo"),k=q.querySelector(".popup__input_card-name"),E=q.querySelector(".popup__input_card-link"),L=document.querySelectorAll(".popup__button-close"),C=document.querySelector(".popup__add-button"),x=document.querySelector(".elements__list"),O=q.querySelector(".popup__form"),A=b.querySelector(".popup__form"),w=b.querySelector(".popup__button"),U=h.querySelector(".popup__form"),j=h.querySelector(".popup__button"),P={baseUrl:"https://nomoreparties.co/v1/plus-cohort-6",headers:{authorization:"5502817d-dfaa-490b-a84a-6a16353d0f1d","Content-Type":"application/json"}},T=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},B=function(e,o,u,c,a,l){var s=document.querySelector(".card").content.querySelector(".element").cloneNode(!0),d=s.querySelector(".element__photo"),p=s.querySelector(".element__button-like"),f=s.querySelector(".element__button-delete"),_=s.querySelector(".element__text");return l||(f.disabled=!0),a&&p.classList.add("element__button-like_active"),d.src=o,d.alt=e,_.textContent=e,p.textContent=c,f.addEventListener("click",(function(e){(function(e){return fetch(P.baseUrl+"/cards/"+e,{method:"DELETE",headers:P.headers}).then((function(e){return T(e)}))})(u).then((function(){e.target.closest(".element").remove()})).catch((function(e){return console.log(e)}))})),p.addEventListener("click",(function(e){e.target.classList.contains("element__button-like_active")?function(e){return console.log(e),fetch(P.baseUrl+"/cards/likes/"+e,{method:"DELETE",headers:P.headers}).then((function(e){return T(e)})).catch((function(e){return console.log(e)}))}(u).then((function(t){e.target.textContent=t.likes.length,e.target.classList.toggle("element__button-like_active")})).catch((function(e){return console.log(e)})):function(e){return fetch(P.baseUrl+"/cards/likes/"+e,{method:"PUT",headers:P.headers}).then((function(e){return T(e)}))}(u).then((function(t){e.target.classList.toggle("element__button-like_active"),e.target.textContent=t.likes.length})).catch((function(e){return console.log(e)}))})),d.addEventListener("click",(function(){return function(e){n.src=e.link,n.alt=e.name,r.textContent=e.name,i(t)}(card)})),s};function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}a=(c={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_active"}).formSelector,l=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(c,["formSelector"]),Array.from(document.querySelectorAll(a)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(t,n){var r=n.inputSelector,o=n.inputErrorClass,u=(n.errorClass,n.submitButtonSelector),c=n.inactiveButtonClass,a=Array.from(t.querySelectorAll(r));a.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n){var r=e.querySelector("#error-".concat(t.id));t.validity.valid?function(e,t,n){e.classList.remove(t),n.textContent=""}(t,n,r):function(e,t,n,r){e.classList.add(t),n.textContent=r}(t,n,r,t.validationMessage)}(t,n,o),e(t,a,u,c)}))})),e(t,a,u,c)}(t,l)})),L.forEach((function(e){e.addEventListener("click",(function(e){return s(e.target.closest(".popup"))}))})),Promise.all([fetch(P.baseUrl+"/users/me",{headers:P.headers}).then((function(e){return T(e)})).then((function(e){var t=[];return t[0]=e.name,t[1]=e.about,t[2]=e._id,t[3]=e.avatar,t})).catch((function(e){console.log(e)})),fetch(P.baseUrl+"/cards",{headers:P.headers}).then((function(e){return T(e)}))]).then((function(e){var t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,u=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(u.push(r.value),!t||u.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return u}}(e,t)||function(e,t){if(e){if("string"==typeof e)return D(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(e,2),n=t[0],r=t[1];p.textContent=n[0],f.textContent=n[1],v.style="background-image: url(".concat(n[3],")");for(var o=r.length-1;o>=0;o--){var u=Boolean(r[o].likes.find((function(e){return e._id===n[2]}))),c=Boolean(r[o].owner._id===n[2]);x.prepend(B(r[o].name,r[o].link,r[o]._id,r[o].likes.length,u,c))}return n[2]})).catch((function(e){console.log(e)})),m.addEventListener("click",(function(){return i(q)})),O.addEventListener("submit",(function(e){e.preventDefault(),C.textContent="Сохранение...",function(e,t){return fetch(P.baseUrl+"/cards",{method:"POST",headers:P.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return T(e)}))}(k.value,E.value).then((function(e){x.prepend(B(e.name,e.link,e._id,void 0,void 0,!0)),s(q),k.value="",E.value="",C.disabled=!0,C.classList.add("popup__button_disabled")})).catch((function(e){return console.log(e)})).finally((function(){C.textContent="Создать"}))})),_.addEventListener("click",(function(){i(b),S.value=p.textContent,g.value=f.textContent})),A.addEventListener("submit",(function(e){e.preventDefault(),w.textContent="Сохранение...",fetch(P.baseUrl+"/users/me",{method:"PATCH",headers:P.headers,body:JSON.stringify({name:S.value,about:g.value})}).then((function(e){return T(e)})).then((function(e){console.log(e),p.textContent=e.name,f.textContent=e.about,w.disabled=!0,s(b)})).catch((function(e){return console.log(e)})).finally((function(){w.textContent="Сохранить"}))})),v.addEventListener("click",(function(){i(h)})),U.addEventListener("submit",(function(e){var t;e.preventDefault(),j.textContent="Сохранение...",(t=y.value,fetch(P.baseUrl+"/users/me/avatar",{method:"PATCH",headers:P.headers,body:JSON.stringify({avatar:t})}).then((function(e){return T(e)}))).then((function(e){v.style="background-image: url(".concat(e.avatar,")"),y.value="",j.disabled=!0,s(h)})).catch((function(e){return console.log(e)})).finally((function(){j.textContent="Сохранить"}))}))})();