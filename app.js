    
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
    }
