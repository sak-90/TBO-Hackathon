const btn=document.getElementById("pay");
btn.addEventListener("click" , () => {
    fetch("http://localhost:3000/create-checkout-session",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
        },
        body:JSON.stringify({
            items:[
                {id:1,quantity:1},
                {
                    id:2,quantity:1
                },
            ],
        }),
    })
      .then(res=>{
        if(res.ok)return res.json()
        return res.json().then((json) => Promise.reject(json));
    })
    .then(({url})=>{
        window.location=url
    })
    .catch(e=>{
    console.error(e)
    })
})