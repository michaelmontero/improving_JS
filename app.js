    
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
        var transmission = $("#transmission").val();
        var commentary = $("#commentary").val();


        //Create a vehicle obj
        objVehicle = {"carId" : carId,"brand" : brand, "model" : model,"transmission" : transmission,"commentary" : commentary};
        data.vehicle.push(objVehicle);

        //insert the method in the local storage
        saveAll();
        showVehicles();
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
        showVehicles();
    }


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
            dataLocation.appendChild(tr)
        }
    }

    function dce(e){
        return document.createElement(e);
    }