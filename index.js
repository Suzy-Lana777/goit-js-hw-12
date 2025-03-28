import{a as m,S as L,i as l}from"./assets/vendor-BjRz3xa9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();m.defaults.baseURL="https://pixabay.com/api/";const R="49399736-5639b789053676a95c3f2e38d";async function p(e,r=1,s=15){const a=new URLSearchParams({q:e,key:R,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:s,page:r});try{return(await m.get(`?${a}`)).data}catch(t){throw new Error(`Failed to fetch images: ${t.message}`)}}function v(e){const{webformatURL:r,largeImageURL:s,tags:a,likes:t,views:i,comments:n,downloads:b}=e;return`
    <li class="li-gallery">
      <a class="li-gallery-a" href="${s}">
        <img class="img" src="${r}" alt="${a}" />
      </a>
      <ul class="baner-info">
        <li class="baner-info-li">
          <p class="baner-info-li-title">Likes</p>
          <p class="baner-info-li-text">${t}</p>
        </li>
        <li class="baner-info-li">
          <p class="baner-info-li-title">Views</p>
          <p class="baner-info-li-text">${i}</p>
        </li>
        <li class="baner-info-li">
          <p class="baner-info-li-title">Comments</p>
          <p class="baner-info-li-text">${n}</p>
        </li>
        <li class="baner-info-li">
          <p class="baner-info-li-title">Downloads</p>
          <p class="baner-info-li-text">${b}</p>
        </li>
      </ul>
    </li>`}function w(e){return e.map(v).join("")}function g(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function h(e){const r={list:document.querySelector(".gallery")};if(!r.list){console.error("No images found");return}if(g(),e.length===0){iziToast.warning({title:"No images found",message:"Try another search term!",position:"topRight"});return}const s=w(e);r.list.insertAdjacentHTML("beforeend",s),new L(".gallery a",{captions:!0,captionsData:"alt",captionType:"attr",captionDelay:250,animationSpeed:350,captionPosition:"bottom"}).refresh()}const o={form:document.querySelector(".form"),input:document.querySelector(".input"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};(!o.form||!o.gallery||!o.loader||!o.loadMoreBtn)&&console.error("Помилка: один або кілька DOM-елементів не знайдено.");let d="",c=1;const u=15;o.form.addEventListener("submit",M);o.loadMoreBtn.addEventListener("click",S);async function M(e){if(e.preventDefault(),d=e.currentTarget.elements.user_request.value.trim(),!d){l.warning({title:"WARNING",message:"Please enter a search term.",position:"topRight"});return}c=1,g(),o.loadMoreBtn.classList.add("visually-hidden"),y();try{const{hits:r,totalHits:s}=await p(d,c,u);if(f(),r.length===0){l.error({title:"ERROR",message:"No images found. Try another search term!",position:"topRight"});return}h(r),s>u&&o.loadMoreBtn.classList.remove("visually-hidden")}catch(r){f(),l.error({title:"ERROR",message:`Error fetching images: ${r.message}`,position:"topRight"})}e.target.reset()}async function S(){c+=1,o.loadMoreBtn.classList.add("visually-hidden"),y();try{const{hits:e,totalHits:r}=await p(d,c,u);f(),o.loadMoreBtn.classList.remove("visually-hidden"),h(e);const s=Math.ceil(r/u);c>=s&&(o.loadMoreBtn.classList.add("visually-hidden"),l.info({title:"INFO",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),$()}catch(e){f(),o.loadMoreBtn.classList.remove("visually-hidden"),l.error({title:"ERROR",message:`Error fetching images: ${e.message}`,position:"topRight"})}}function y(){o.loader.classList.remove("visually-hidden")}function f(){o.loader.classList.add("visually-hidden")}function $(){const e=o.gallery.firstElementChild;if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
