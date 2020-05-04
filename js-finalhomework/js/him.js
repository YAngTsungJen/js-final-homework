//DOM
var btn =document.querySelector('.btn');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('getList'))||[];
var r =document.querySelector('.rightname');
var bmitext = document.querySelector('.bmitext');
var result = document.querySelector('.result');
var circle = document.querySelector('.circle');
var rightname = document.querySelector('.rightname');
var d = document.querySelector('.delete');
var ld = document.querySelector('.ldelete');
var T = document.querySelector('.tall').value;
var W = document.querySelector('.weight').value;
var content;
var Color={
    '過輕':{
        class:'border1',
    },
    '理想':{
        class:'border2',
    },
    '過重':{
        class:'border3',
    },
    '輕度肥胖':{
        class:'border4',
    },
    '中度肥胖':{
        class:'border4',
    },
    '重度肥胖':{
        class:'border5',
    },
};
var delcolor = {
    '過輕':{
        class:'ldelete',
    },
    '理想':{
        class:'ldelete',
    },
    '過重':{
        class:'ldelete',
    },
    '輕度肥胖':{
        class:'ldelete',
    },
    '中度肥胖':{
        class:'ldelete',
    },
    '重度肥胖':{
        class:'ldelete',
    },
}
var Status = '';
var RealBMI;
var BMItall;
var BMIweight;
var Today;
update(data);//在載入時可以顯現之前輸入資料
//監聽
btn.addEventListener('click',count,false);
// btn.addEventListener('click',addList,false);
d.addEventListener('click',del,false);
list.addEventListener('click',function(e){
    e.preventDefault();
    if(e.target.nodeName !=='A'){return}
    var num = e.target.dataset.num;
    data.splice(num,1);
    localStorage.setItem('getList',JSON.stringify(data));
    update(data);
},false);
//計算BMI多少
function count(){
    var T = document.querySelector('.tall').value;
    var W = document.querySelector('.weight').value;
    BMItall = parseInt(T)/100;
    BMIweight =parseInt(W);
    console.log(T,W);
    if(T ==''|| W ==''){
        alert('請輸入數字');
        return
    }else{
        var BMI = BMIweight/(BMItall*BMItall);
        RealBMI = BMI.toFixed(2);//取兩位數
        // alert(RealBMI);
        //看結果的BMI位於什麼顏色
        var Color = '';
        Status= '';
        if(RealBMI<18.5){
            Status = '過輕';
            Color = '#31BAF9';
            bmitext.setAttribute('class','bmitext1')
            btn.value = RealBMI;
            btn.setAttribute('class','color1')
            circle.setAttribute('class','circle1')
            rightname.setAttribute('class','rightname1')
            rightname.innerHTML = '過輕';
        }else if(RealBMI>=18.5&& RealBMI<24){
            Status = '理想';
            Color = '#86D73F';
            bmitext.setAttribute('class','bmitext2')
            btn.value = RealBMI;
            btn.setAttribute('class','color2')
            circle.setAttribute('class','circle2')
            rightname.setAttribute('class','rightname2')
            rightname.innerHTML = '理想';
        }else if(RealBMI>=24&&RealBMI<27){
            Status = '過重';
            Color = '#FF982D';
            bmitext.setAttribute('class','bmitext3')
            btn.value = RealBMI;
            btn.setAttribute('class','color3')
            circle.setAttribute('class','circle3')
            rightname.setAttribute('class','rightname3')
            rightname.innerHTML = '過重';
        }else if(RealBMI>=27&&RealBMI<30){
            Status = '輕度肥胖';
            Color = '#FF6C02';
            bmitext.setAttribute('class','bmitext4')
            btn.value = RealBMI;
            btn.setAttribute('class','color4')
            circle.setAttribute('class','circle4')
            rightname.setAttribute('class','rightname4')
            rightname.innerHTML = '輕度肥胖';
        }else if(RealBMI>=30&&RealBMI<35){
            Status = '中度肥胖';
            Color = '#FF6C02';
            bmitext.setAttribute('class','bmitext4')
            btn.value = RealBMI;
            btn.setAttribute('class','color4')
            circle.setAttribute('class','circle4')
            rightname.setAttribute('class','rightname4')
            rightname.innerHTML = '中度肥胖';
        }else{
            Status = '重度肥胖';
            Color= '#FF1200';
            bmitext.setAttribute('class','bmitext5')
            btn.value = RealBMI;
            btn.setAttribute('class','color5')
            circle.setAttribute('class','circle5')
            rightname.setAttribute('class','rightname5')
            rightname.innerHTML = '重度肥胖';
        }
        var day = new Date();
        Today = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();
    }
    addList();
    localStorage.setItem('getList',JSON.stringify(data));
    update(data);
}
function addList(){
    var allTheList ={
        today :Today,
        status:Status,
        bmi:RealBMI,
        tall:BMItall,
        weight:BMIweight,
    };
    data.push(allTheList);
    localStorage.setItem('getList',JSON.stringify(data));
}    

function update(data){
    var str = '';
    var len = data.length;
    for(var i=0;i<len;i++){
        if( data[i].bmi < 18.5){
            status = '過輕';
        }else if(data[i].bmi >= 18.5 && data[i].bmi<24){
            status = '理想';
        }else if(data[i].bmi >= 24 && data[i].bmi <27){
            status = '過重';
        }else if(data[i].bmi >= 27 && data[i].bmi  <30){
            status = '輕度肥胖';
        }else if(data[i].bmi >= 30 && data[i].bmi  <35){
            status = '中度肥胖';
        }else{
            status = '重度肥胖';
        }
        str +='<li class="'+Color[status].class+'"><p>'+data[i].status+'</p><p>BMI  '+data[i].bmi+'</p><p>weight '+data[i].weight+' kg</p><p>height '+(data[i].tall)*100+' cm</p><p>date '+data[i].today+'</p><a href="#" data-num='+i+' class="'+delcolor[status].class+'">X</a></li>';
    }
    list.innerHTML = str;
}


function del(){
    data =[];
    localStorage.setItem('getList',JSON.stringify(data));
    update(data);
}