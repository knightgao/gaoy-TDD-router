
function setup(){
    document.querySelector('#app').innerHTML = `
  <div>
    <div class="card">
      <button id="before" type="button">前一页</button>
    </div>
    <div class="card">
      <div>当前的路由<span id="current"></span></div>
    </div>
    <div class="card">
      <button id="next" type="button">后一页</button>
    </div>
  </div>
`
    setupBtn()
}


function setupBtn(){
    document.querySelector('#before').addEventListener('click', function(){
        router.before()
    })
    document.querySelector('#next').addEventListener('click', function(){
        router.next()
    })
}


