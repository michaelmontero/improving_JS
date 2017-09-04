    $("#divBrand").hide();
    $("#divModel").hide();
    $("#sucessPanel").hide();
    $("#errorPanel").hide();
    var data = {
        vehicle : [],
        brand : [],
        model : []
    };
    var objVehicle = null;

    //this function insert the vehicle object into the data.vehicle array
    function saveVehiche(){
        var carId = $("#carId").val();
        var brand = $("#brand").val();
        var model = $("#model").val();
        var transmission = $("#transmission").val()
        var commentary = $("#commentary").val();

        if(carId != null || brand !=null || model != null || transmission == null || commentary ==null){
            $("#errorPanel").show();
            $("#errorMessage").html("Please fill all fields");
        }else{
            //Create a vehicle obj
            objVehicle = {"carId" : carId,"brand" : brand, "model" : model,"transmission" : transmission,"commentary" : commentary};
            data.vehicle.push(objVehicle);

            //insert the method in the local storage
            saveAll();
            showVehicles();
            clearAll();
        }
    }

    //Insert the data object in localStorage
    function saveAll(){
        localStorage.setItem("data", JSON.stringify(data));
    }

    //Retrive the data saved in localStorage every time the page is reload.
    function getData(){
        var info = localStorage.getItem("data");
        if(info != null){
            //If the info is not null reset the data object
            data = JSON.parse(info);
        }

        fillBrandSelect();
        showVehicles();
    }

    function fillBrandSelect(){
        var brandSelect = document.getElementById("brand");
        brandSelect.innerHTML = "";
        for(x =0 ; x<data.brand.length;x++){
            var option = dce("option");
            option.value = data.brand[x];
            option.innerHTML = data.brand[x]
            brandSelect.appendChild(option)
        }
        brandSelect.selectedIndex = -1;
    }
    //Fills the table that contains the information dynamically
    function showVehicles(){
        var dataLocation = document.getElementById("tBody");
        dataLocation.innerHTML = "";
        for(x =0 ; x < data.vehicle.length; x++){
            vehicle  = data.vehicle[x];
            var tr = dce("tr");

            for(key in vehicle){
                property = vehicle[key];
                td = dce("td")
                td.innerHTML = property;
                tr.appendChild(td)
            }
            tdAction = dce("td");

            delButton = createButton("Delete", "btn btn-danger", "deleteVehicle("+x+")"); //Create delete button
            editButton = createButton("Edit", "btn btn-warning","editVehicle("+x+")"); //Create edit button

            tdAction.appendChild(delButton);
            tdAction.appendChild(editButton);

            tr.appendChild(tdAction)
            dataLocation.appendChild(tr)
        }
    }

    //Return a new button
    function createButton(text, className, functionName){
        var btn = dce("button");
        btn.type = "button";
        btn.setAttribute("class", className);
        btn.innerHTML = text;
        btn.setAttribute("onClick", functionName)
        return btn;
    }

    function dce(e){
        return document.createElement(e);
    }

    function deleteVehicle(index){
        var deleteMsj = "Are you sure you want to delete the vehicle?";
        if(confirm(deleteMsj)){
            delete data.vehicle[index];
            saveAll();
            showVehicles();
        }
    }

    function editVehicle(index){
        
    }

    function showBrandDiv(){
        var destination = document.getElementById("divBrandList");
        destination.innerHTML = "";

        for(x =0; x < data.brand.length; x++){
            appendBrand(data.brand[x], destination);  //Showing/Creating all input brands previously created and add them his respective value
        }

        $("#divMain, #divModel").hide("slow");
        $("#divBrand").show("slow");
    }

    
    function showModelDiv(){

        var destination = document.getElementById("divBrandList");
        destination.innerHTML = "";

        for(x =0; x < data.model.length; x++){
            appendModel(data.brand[x], x);  //Showing/Creating all input brands previously created and add them his respective value
        }

        $("#divMain, #divBrand").hide("slow");
        $("#divModel").show("slow");
    }

    function backButton(){
        $("#divMain").show("slow");
        $("#divModel, #divBrand").hide("slow");
    }

    //This function create a brand input and assigns it a value
    

    function removeBrand(e){
        e.parentNode.parentNode.removeChild(e.parentNode);
        saveBrand();
    }

    function saveBrand(){
        brands = document.getElementsByName("inputBrand");

        data.brand = []; //Reset the original object
        for(x = 0; x < brands.length; x++){
            data.brand.push(brands[x].value)
        }
        saveAll();
        getData();
    }

    function appendBrand(text){
            var destination = document.getElementById("divBrandList");
            div = dce("div");
            div.setAttribute("class", "input-group form-group");
        
            span = dce("span");
            span.setAttribute("class", "input-group-addon");
            span.innerHTML = "+";
            input = dce("input");
            input.setAttribute("class", "form-control");
            input.setAttribute("name", "inputBrand"); //Add the same name to every input for iterate all inputs later.
            input.setAttribute("type", "text");
            input.setAttribute("value", text);
     
            div.appendChild(span)
            div.appendChild(input)
        
            destination.appendChild(div)
    }


    function appendModel(text, index){
        destination = document.getElementById("modelList");
        destination.inneHTML = "";
        
        tr = dce("tr");
        td = dce("td");
        select = dce("select");

        for(i = 0; i < data.brand.length; i++){
            opt = dce("option");
            opt.value = data.brand[i];
            opt.text = data.brand[i];
            select.appendChild(opt);
        }
        select.setAttribute("class", "form-control");
        select.setAttribute("name", "name_brand");
        select.selectedIndex = index;
        td.appendChild(select);
        tr.appendChild(td);

        td = dce("td");
        txt = dce("input");
        txt.setAttribute("type","text");
        txt.setAttribute("name", "name_model")
        txt.setAttribute("value",text)
        txt.setAttribute("class", "form-control")
        td.appendChild(txt)
        tr.appendChild(td)
        destination.appendChild(tr)
    }

    function saveModel(){
        brands = document.getElementsByName("name_brand");
        model = document.getElementsByName("name_model");
        
        data.model = []; //Reset the original object
        for(x = 0; x < model.length; x++){
            data.model.push([brands[x].value, model[x].value]);
        }
        saveAll();
        getData();
        $("#sucessPanel").show();
    }

    function filterModel(value){
        var selectModel = document.getElementById("model")
        selectModel.innerHTML = "";
        for(x =0 ; x < data.model.length; x++){
            if(data.model[x][0] == value){
                opt = dce("option")
                opt.value = data.model[x][1]
                opt.innerHTML = data.model[x][1]
                selectModel.appendChild(opt)
            }
        }
        selectModel.selectedIndex = -1;
    }
