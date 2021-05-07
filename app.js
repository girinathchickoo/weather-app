const express=require("express")
const app=express();
const bodyParser=require("body-parser")
const https=require("https")


app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html")
})


app.post("/",function(req,res){
	var city=req.body.cityname;
	var url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d865240260800fac05ff0393e476c7d7&units=metric`
	https.get(url,function(response){
		response.on("data",function(data){
			var data=JSON.parse(data)
			var icon=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
			
			res.write("<p>The temperature in " + city  + " is " +data.main.temp + " deg C " + ", " + data.weather[0].description +".</p>")
			res.write("<h2>Humidity : "+data.main.humidity+ "%</h2>")
			res.write(`<img src="${icon}">`)
			res.send()
		})

	})
})
app.listen(3000 || process.env.PORT,function (){
	console.log("server running on port :3000")
})