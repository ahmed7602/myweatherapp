const apikey="0eacb45351033c2253a60d93e175beb3";
window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lon= position.coords.longitude;
            let lat= position.coords.latitude;
            console.log(lat);
            console.log(lon);
            const url= `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&` + `lon=${lon}&appid=${apikey}`;
            fetch(url)
            .then(response => response.json())
            .then(
                data => weatherReport(data) 
               
                
            )
            
        })
    }
})
document.getElementById('search').addEventListener('click',() => {
    var place=document.getElementById('input').value;
    var urlsearch = `http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${apikey}`;
    fetch(urlsearch)
        .then(response => response.json())
        .then(
            data =>
            {
                console.log(data);
                weatherReport(data);
            }
        )
})
function weatherReport(data){
    var urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${data.city.name}&appid=${apikey}`;
    fetch(urlcast)
    .then(
        response => response.json()
    )
    .then(
        forecast => {
            console.log(forecast);
            hourForecast(forecast);
            dayForecast(forecast);

            document.getElementById('city').innerText=data.city.name+','+data.city.country;
            document.getElementById('temperature').innerText=Math.floor(data.list[0].main.temp-273)+'°C';
            document.getElementById('clouds').innerText=data.list[0].weather[0].main;
            let icon = data.list[0].weather[0].icon;
            let iconurl = 'http://api.openweathermap.org/img/w/'+icon+'.png';
            document.getElementById('img').src=iconurl;
        }
    )

}

function hourForecast(forecast){
    document.querySelector('.templist').innerHTML='';
    for(let i=0;i<4;i++){

        var date=new Date(forecast.list[i+1].dt*1000);
        let hourR=document.createElement('div');
        hourR.setAttribute('class','next');

        let div=document.createElement('div');
        let time=document.createElement('p');
        time.setAttribute('class','time');
        time.innerText=(date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','');
        
        let temp=document.createElement('p');
        temp.innerText=Math.floor(forecast.list[i+1].main.temp_max-273)+'°C / '+Math.floor(forecast.list[i+1].main.temp_min-273)+'°C';
        div.appendChild(time);
        div.appendChild(temp);

        let desc=document.createElement('p');
        desc.setAttribute('class','desc');
        desc.innerText=forecast.list[i+1].weather[0].description;
        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR);

    }
}

function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML='';
    for(let i=4;i<17;i+=4){
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
        
        
        let day= document.createElement('p');
        day.setAttribute('class','date')
        day.innerText= new Date(forecast.list[i+1].dt*1000).toDateString();
        div.appendChild(day);
        
        let temp=document.createElement('p');
        temp.innerText=Math.floor(forecast.list[i+1].main.temp_max-273)+'°C / '+Math.floor(forecast.list[i+1].main.temp_min-273)+'°C';
        div.appendChild(temp);
        
        let description= document.createElement('p');
        description.setAttribute('class','description')
        description.innerText= forecast.list[i+1].weather[0].description;
        div.appendChild(description);
        
        document.querySelector('.weekF').appendChild(div);
        
       
    }
}
