/* 
<Activity Tracker: A personal health and fitness tracker>
Copyright (C) <2018>  <Tyler Loewen, Bradley Rey, Nahiyan Naim>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/gpl.txt>.

Contact at tylerscottloewen@gmail.com
*/

// global variable to store current working activity
var currentActivity = "";
var lastActivity = "";


function activity(activityType, amountReqGoal, defaultUnits, daysPerWeekGoal, currentAmount) {
    this.activityType = activityType;       // string
    this.amountReqGoal = amountReqGoal;     // int
    this.defaultUnits = defaultUnits;       //string
    this.daysPerWeekGoal = daysPerWeekGoal; // int
    this.currentAmount = 0;                 // int
}

// All activity objects
var runningActivity = new activity();
var walkingActivity = new activity();
var waterIntakeActivity = new activity();
var hoursOfSleepActivity = new activity();
var calorieIntakeActivity = new activity();

// For menu push screen
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0px";
}

function hideTargetCard(activityContainer) {
 document.getElementById(activityContainer).style.display='none';
}

function showTargetCard(activityType) {
 document.getElementById(activityType).style.display='inline-block';
}

function hideAllCards()
{
    hideTargetCard("Running");
    hideTargetCard("Walking");
    hideTargetCard("WaterIntake");
    hideTargetCard("CalorieIntake");
    hideTargetCard("HoursOfSleep");
}

hideAllCards();


//called when create new activity clicked
$('#newActivityButton').click(function(e){ 
        $('#newActivityOne').insertAfter('#createNA');
});

$('#selectActivityButton').click(function(e){ 
    $('#newActivityTwo').insertAfter('#newActivityOne');
    saveActivityType();
});

$('#goalSettingsButton').click(function(e){
    var x = document.getElementById("amountReqGoalText").value;
    if (isNaN(x) || x === "") {
        $("#amountReqGoalText").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveGoalSettings();
        $('#newActivityThree').insertAfter('#newActivityTwo');
        $("#amountReqGoalText").attr("placeholder", "e.g. 5").val("").focus().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#streakSettingsButton').click(function(e){
    saveStreakSettings();
    var x = document.getElementById("saveActivityDrop");
    if (x.length === 0) {
        hideTargetCard("newActivityContainer");
    }
    $('#createNA').insertAfter('#newActivityThree');
    $(currentActivity).insertBefore("#newActivityContainer");
    showTargetCard(currentActivity);
});

$('#newActivityBackOne').click(function(e){
    $('#createNA').insertAfter('#newActivityOne');
    
});

$('#newActivityBackTwo').click(function(e){
    $('#newActivityOne').insertAfter('#newActivityTwo');
    $("#amountReqGoalText").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
    addListActivity();
});

$('#newActivityBackThree').click(function(e){
     $('#newActivityTwo').insertAfter('#newActivityThree');
});

function addListActivity() {
    
    switch (currentActivity) {
        case "Running":
            var x = document.getElementById("saveActivityDrop");
            var option = document.createElement("option");
            option.text = "Running";
            x.add(option);
            break;
        case "Walking":
            var y = document.getElementById("saveActivityDrop");
            var option = document.createElement("option");
            option.text = "Walking";
            y.add(option);
            break;
        case "WaterIntake":
            var z = document.getElementById("saveActivityDrop");
            var option = document.createElement("option");
            option.text = "Water Intake";
            z.add(option);
            break;
        case "HoursOfSleep":
            var w = document.getElementById("saveActivityDrop");
            var option = document.createElement("option");
            option.text = "Sleep";
            w.add(option);
            break;
        case "CalorieIntake":
            var u = document.getElementById("saveActivityDrop");
            var option = document.createElement("option");
            option.text = "Calorie Intake";
            u.add(option);
            break;
    }
}

//called on card 1/3 next button clicked
function saveActivityType() {
    var dropdown = document.getElementById("saveActivityDrop").value;
    var toDelete = document.getElementById("saveActivityDrop");
    toDelete.remove(toDelete.selectedIndex);

    switch(dropdown) {
        case "Running":
            runningActivity.activityType = dropdown;
            currentActivity = dropdown;
            document.getElementById("defaultUnitsDrop").innerHTML = '<option value="Metres"> Metres </option> <option value="Kilometres"> Kilometres </option>';
            break;
        case "Walking":
            walkingActivity.activityType = dropdown;
            currentActivity = dropdown;
            document.getElementById("defaultUnitsDrop").innerHTML = '<option value="Metres"> Metres </option> <option value="Kilometres"> Kilometres </option>';           
            break;
        case "Water Intake":
            waterIntakeActivity.activityType = "WaterIntake";
            currentActivity = "WaterIntake";
            document.getElementById("defaultUnitsDrop").innerHTML = '<option value="Cups"> Cups </option> <option value="Litres"> Litres </option>';           
            break;
        case "Sleep":
            hoursOfSleepActivity.activityType = "HoursOfSleep";
            currentActivity = "HoursOfSleep";
            document.getElementById("defaultUnitsDrop").innerHTML = '<option value="Hours"> Hours </option> <option value="Minutes"> Minutes </option>';           
            break;
        case "Calorie Intake":
            calorieIntakeActivity.activityType = "CalorieIntake";
            currentActivity = "CalorieIntake";
            document.getElementById("defaultUnitsDrop").innerHTML = '<option value="Calories"> Calories </option>';           
            break;
    }
}

//called on card 2/3 next button clicked
function saveGoalSettings() {
    var goalAmount = parseInt(document.getElementById("amountReqGoalText").value);
    var units = document.getElementById("defaultUnitsDrop").value;
    
    switch (currentActivity) {
        case "Running":
            runningActivity.amountReqGoal = goalAmount;
            runningActivity.defaultUnits = units;
            break;
        case "Walking":
            walkingActivity.amountReqGoal = goalAmount;
            walkingActivity.defaultUnits = units;
            break;
        case "WaterIntake":
            waterIntakeActivity.amountReqGoal = goalAmount;
            waterIntakeActivity.defaultUnits = units;
            break;
        case "HoursOfSleep":
            hoursOfSleepActivity.amountReqGoal = goalAmount;
            hoursOfSleepActivity.defaultUnits = units;
            break;
        case "CalorieIntake":
            calorieIntakeActivity.amountReqGoal = goalAmount;
            calorieIntakeActivity.defaultUnits = units;
            break;
    }
}

//called on card 3/3 next button clicked
function saveStreakSettings() {
    var streak = parseInt(document.getElementById("streakSettingsDrop").value);
    
    switch (currentActivity) {
        case "Running":
            runningActivity.daysPerWeekGoal = streak;
            break;
        case "Walking":
            walkingActivity.daysPerWeekGoal = streak;
            break;
        case "WaterIntake":
            waterIntakeActivity.daysPerWeekGoal = streak;
            break;
        case "HoursOfSleep":
            hoursOfSleepActivity.daysPerWeekGoal = streak;
            break;
        case "CalorieIntake":
            calorieIntakeActivity.daysPerWeekGoal = streak;
            break;
    }
}

/////// Running Start

$('#addRunningButton').click(function(e){
    setToRunning();
    $('#enterDataRunning').insertAfter('#runningMainCard');
    $("#amountAddRunning").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveEnterDataRunning').click(function(e){
    var x = document.getElementById("amountAddRunning").value;
    if (isNaN(x) || x === "") {
        $("#amountAddRunning").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveEnterData();
        $('#runningMainCard').insertAfter('#enterDataRunning');
        $("#amountAddRunning").attr("placeholder", "e.g. 5").val("").focus().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromEnterDataRunning').click(function(e){
    setToRunning();
    $('#runningMainCard').insertAfter("#enterDataRunning");
});

$('#settingsRunningButton').click(function(e){
    setToRunning();
    $('#settingsRunning').insertAfter('#runningMainCard');
    $("#goalChangeRunning").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveSettingsRunning').click(function(e){
    var x = document.getElementById("goalChangeRunning").value;
    if (isNaN(x) || x === "") {
        $("#goalChangeRunning").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveSettings();
        $("#runningMainCard").insertAfter("#settingsRunning");
        $("#goalChangeRunning").attr("placeholder", "e.g. 5").val("").foucs().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromSettingsRunning').click(function(e){
    $('#runningMainCard').insertAfter('#settingsRunning');
});

$('#deleteRunning').click(function(e){
    var result = confirm ("Are you sure you want to delete this activity?");
    if (result) {
        deleteActivity();
        $('#runningMainCard').insertAfter("#settingsRunning");
        hideTargetCard(currentActivity);
    }
    addListActivity();
    var x = document.getElementById("saveActivityDrop");
    if (x.length === 1) {
        showTargetCard("newActivityContainer");
    }
});

$('#extrasRunningButton').click(function(e) {
    $('#progressRunning').insertAfter("#runningMainCard");
});

$('#backFromProgressRunning').click(function(e) {
    $('#runningMainCard').insertAfter("#progressRunning");
});

$('#goToShareRunning').click(function(e) {
    $('#shareRunning').insertAfter("#progressRunning");
});

$('#backFromShareRunning').click(function(e) {
    $('#progressRunning').insertAfter("#shareRunning");
});
/////// Running end

/////// Walking Start

$('#addWalkingButton').click(function(e){
    setToWalking();
    $('#enterDataWalking').insertAfter('#walkingMainCard');
    $("#amountAddWalking").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveEnterDataWalking').click(function(e){
    var x = document.getElementById("amountAddWalking").value;
    if (isNaN(x) || x === "") {
        $("#amountAddWalking").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveEnterData();
        $('#walkingMainCard').insertAfter('#enterDataWalking');
        $("#amountAddWalking").attr("placeholder", "e.g. 5").val("").focus().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromEnterDataWalking').click(function(e){
    setToWalking();
    $('#walkingMainCard').insertAfter("#enterDataWalking");
});

$('#settingsWalkingButton').click(function(e){
    setToWalking();
    $('#settingsWalking').insertAfter('#walkingMainCard');
    $("#goalChangeWalking").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveSettingsWalking').click(function(e){
    var x = document.getElementById("goalChangeWalking").value;
    if (isNaN(x) || x === "") {
        $("#goalChangeWalking").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveSettings();
        $("#walkingMainCard").insertAfter("#settingsWalking");
        $("#goalChangeWalking").attr("placeholder", "e.g. 5").val("").foucs().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromSettingsWalking').click(function(e){
    $('#walkingMainCard').insertAfter('#settingsWalking');
});

$('#deleteWalking').click(function(e){
    var result = confirm ("Are you sure you want to delete this activity?");
    if (result) {
        deleteActivity();
        $('#walkingMainCard').insertAfter("#settingsWalking");
        hideTargetCard(currentActivity);
    }
    addListActivity();
    var x = document.getElementById("saveActivityDrop");
    if (x.length === 1) {
        showTargetCard("newActivityContainer");
    }
});

$('#extrasWalkingButton').click(function(e) {
    $('#progressWalking').insertAfter("#walkingMainCard");
});

$('#backFromProgressWalking').click(function(e) {
    $('#walkingMainCard').insertAfter("#progressWalking");
});

$('#goToShareWalking').click(function(e) {
    $('#shareWalking').insertAfter("#progressWalking");
});

$('#backFromShareWalking').click(function(e) {
    $('#progressWalking').insertAfter("#shareWalking");
});
/////// Walking end


/////// Water Intake start

$('#addWaterIntakeButton').click(function(e){
    setToWaterIntake();
    $('#enterDataWaterIntake').insertAfter('#waterIntakeMainCard');
    $("#amountAddWaterIntake").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveEnterDataWaterIntake').click(function(e){
    var x = document.getElementById("amountAddWaterIntake").value;
    if (isNaN(x) || x === "") {
        $("#amountAddWaterIntake").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveEnterData();
        $('#waterIntakeMainCard').insertAfter('#enterDataWaterIntake');
        $("#amountAddWaterIntake").attr("placeholder", "e.g. 5").val("").focus().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromEnterDataWaterIntake').click(function(e){
    setToWaterIntake();
    $('#waterIntakeMainCard').insertAfter("#enterDataWaterIntake");
});

$('#settingsWaterIntakeButton').click(function(e){
    setToWaterIntake();
    $('#settingsWaterIntake').insertAfter('#waterIntakeMainCard');
    $("#goalChangeWaterIntake").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveSettingsWaterIntake').click(function(e){
    var x = document.getElementById("goalChangeWaterIntake").value;
    if (isNaN(x) || x === "") {
        $("#goalChangeWaterIntake").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveSettings();
        $("#waterIntakeMainCard").insertAfter("#settingsWaterIntake");
        $("#goalChangeWaterIntake").attr("placeholder", "e.g. 5").val("").foucs().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromSettingsWaterIntake').click(function(e){
    $('#waterIntakeMainCard').insertAfter('#settingsWaterIntake');
});

$('#deleteWaterIntake').click(function(e){
    var result = confirm ("Are you sure you want to delete this activity?");
        if (result) {
        deleteActivity();
        $('#waterIntakeMainCard').insertAfter("#settingsWaterIntake");
    hideTargetCard(currentActivity);
    }
    addListActivity();
    var x = document.getElementById("saveActivityDrop");
    if (x.length === 1) {
        showTargetCard("newActivityContainer");
    }
});

$('#extrasWaterIntakeButton').click(function(e) {
    $('#progressWaterIntake').insertAfter("#waterIntakeMainCard");
});

$('#backFromProgressWaterIntake').click(function(e) {
    $('#waterIntakeMainCard').insertAfter("#progressWaterIntake");
});

$('#goToShareWaterIntake').click(function(e) {
    $('#shareWaterIntake').insertAfter("#progressWaterIntake");
});

$('#backFromShareWaterIntake').click(function(e) {
    $('#progressWaterIntake').insertAfter("#shareWaterIntake");
});
/////// Water Intake end


/////// Hours of Sleep start

$('#addHoursOfSleepButton').click(function(e){
    setToHoursOfSleep();
    $('#enterDataHoursOfSleep').insertAfter('#hoursOfSleepMainCard');
    $("#amountAddHoursOfSleep").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveEnterDataHoursOfSleep').click(function(e){
    var x = document.getElementById("amountAddHoursOfSleep").value;
    if (isNaN(x) || x === "") {
        $("#amountAddHoursOfSleep").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveEnterData();
        $('#hoursOfSleepMainCard').insertAfter('#enterDataHoursOfSleep');
        $("#amountAddHoursOfSleep").attr("placeholder", "e.g. 5").val("").focus().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromEnterDataHoursOfSleep').click(function(e){
    setToHoursOfSleep();
    $('#hoursOfSleepMainCard').insertAfter("#enterDataHoursOfSleep");
});

$('#settingsHoursOfSleepButton').click(function(e){
    setToHoursOfSleep();
    $('#settingsHoursOfSleep').insertAfter('#hoursOfSleepMainCard');
    $("#goalChangeHoursOfSleep").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveSettingsHoursOfSleep').click(function(e){
    var x = document.getElementById("goalChangeHoursOfSleep").value;
    if (isNaN(x) || x === "") {
        $("#goalChangeHoursOfSleep").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveSettings();
        $("#hoursOfSleepMainCard").insertAfter("#settingsHoursOfSleep");
        $("#goalChangeHoursOfSleep").attr("placeholder", "e.g. 5").val("").foucs().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromSettingsHoursOfSleep').click(function(e){
    $('#hoursOfSleepMainCard').insertAfter('#settingsHoursOfSleep');
});

$('#deleteHoursOfSleep').click(function(e){
    var result = confirm ("Are you sure you want to delete this activity?");
    if (result) {
        deleteActivity();
        $('#hoursOfSleepMainCard').insertAfter("#settingsHoursOfSleep");
        hideTargetCard(currentActivity);
    }
    addListActivity();
    var x = document.getElementById("saveActivityDrop");
    if (x.length === 1) {
        showTargetCard("newActivityContainer");
    }
});

$('#extrasHoursOfSleepButton').click(function(e) {
    $('#progressHoursOfSleep').insertAfter("#hoursOfSleepMainCard");
});

$('#backFromProgressHoursOfSleep').click(function(e) {
    $('#hoursOfSleepMainCard').insertAfter("#progressHoursOfSleep");
});

$('#goToShareHoursOfSleep').click(function(e) {
    $('#shareHoursOfSleep').insertAfter("#progressHoursOfSleep");
});

$('#backFromShareHoursOfSleep').click(function(e) {
    $('#progressHoursOfSleep').insertAfter("#shareHoursOfSleep");
});

/////// Hours of Sleep end


/////// Calorie Intake start

$('#addCalorieIntakeButton').click(function(e){
    setToCalorieIntake();
    $('#enterDataCalorieIntake').insertAfter('#calorieIntakeMainCard');
    $("#amountAddCalorieIntake").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveEnterDataCalorieIntake').click(function(e){
    var x = document.getElementById("amountAddCalorieIntake").value;
    if (isNaN(x) || x === "") {
        $("#amountAddCalorieIntake").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveEnterData();
        $('#calorieIntakeMainCard').insertAfter('#enterDataCalorieIntake');
        $("#amountAddCalorieIntake").attr("placeholder", "e.g. 5").val("").focus().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromEnterDataCalorieIntake').click(function(e){
    setToCalorieIntake();
    $('#calorieIntakeMainCard').insertAfter("#enterDataCalorieIntake");
});

$('#settingsCalorieIntakeButton').click(function(e){
    setToCalorieIntake();
    $('#settingsCalorieIntake').insertAfter('#calorieIntakeMainCard');
    $("#goalChangeCalorieIntake").attr("placeholder", "e.g. 5").val("").focus().blur();
    $('.textBox').css('border','1.5px solid black');
});

$('#saveSettingsCalorieIntake').click(function(e){
    var x = document.getElementById("goalChangeCalorieIntake").value;
    if (isNaN(x) || x === "") {
        $("#goalChangeCalorieIntake").attr("placeholder", "Invalid Number").val("").focus().blur();
        $('.textBox').css('border','1.5px solid red');
    }
    else {
        saveSettings();
        $("#calorieIntakeMainCard").insertAfter("#settingsCalorieIntake");
        $("#goalChangeCalorieIntake").attr("placeholder", "e.g. 5").val("").foucs().blur();
        $('.textBox').css('border','1.5px solid black');
    }
});

$('#backFromSettingsCalorieIntake').click(function(e){
    $('#calorieIntakeMainCard').insertAfter('#settingsCalorieIntake');
});

$('#deleteCalorieIntake').click(function(e){
    var result = confirm ("Are you sure you want to delete this activity?");
    if (result) {
        deleteActivity();
        $('#calorieIntakeMainCard').insertAfter("#settingsCalorieIntake");
        hideTargetCard(currentActivity);
    }
    addListActivity();
    var x = document.getElementById("saveActivityDrop");
    if (x.length === 1) {
        showTargetCard("newActivityContainer");
    }
});

$('#extrasCalorieIntakeButton').click(function(e) {
    $('#progressCalorieIntake').insertAfter("#calorieIntakeMainCard");
});

$('#backFromProgressCalorieIntake').click(function(e) {
    $('#calorieIntakeMainCard').insertAfter("#progressCalorieIntake");
});

$('#goToShareCalorieIntake').click(function(e) {
    $('#shareCalorieIntake').insertAfter("#progressCalorieIntake");
});

$('#backFromShareCalorieIntake').click(function(e) {
    $('#progressCalorieIntake').insertAfter("#shareCalorieIntake");
});
/////// Calorie Intake end


function deleteActivity() {
    switch (currentActivity) {
        case "Running":
            runningActivity.currentAmount = 0;
            runningActivity.amountReqGoal = 0;
            runningActivity.daysPerWeekGoal = 0;
            document.getElementById("runningBar").style.width = 0+'%';
            document.getElementById("runningBar").innerHTML = '';
            break;
        case "Walking":
            walkingActivity.currentAmount = 0;
            walkingActivity.amountReqGoal = 0;
            walkingActivity.daysPerWeekGoal = 0;
            document.getElementById("walkingBar").style.width = 0+'%';
            document.getElementById("walkingBar").innerHTML = '';
            break;
        case "WaterIntake":
            waterIntakeActivity.currentAmount = 0;
            waterIntakeActivity.amountReqGoal = 0;
            waterIntakeActivity.daysPerWeekGoal = 0;
            document.getElementById("waterIntakeBar").style.width = 0+'%';
            document.getElementById("waterIntakeBar").innerHTML = '';
            break;
        case "HoursOfSleep":
            hoursOfSleepActivity.currentAmount = 0;
            hoursOfSleepActivity.amountReqGoal = 0;
            hoursOfSleepActivity.daysPerWeekGoal = 0;
            document.getElementById("hoursOfSleepBar").style.width = 0+'%';
            document.getElementById("hoursOfSleepBar").innerHTML = '';
            break;
        case "CalorieIntake":
            calorieIntakeActivity.currentAmount = 0;
            calorieIntakeActivity.amountReqGoal = 0;
            calorieIntakeActivity.daysPerWeekGoal = 0;
            document.getElementById("calorieIntakeBar").style.width = 0+'%';
            document.getElementById("calorieIntakeBar").innerHTML = '';
            break;
    }
}

function saveEnterData() {
    
    switch (currentActivity) {
        case "Running":
            var amountToAdd = parseInt(document.getElementById("amountAddRunning").value);
            runningActivity.currentAmount += amountToAdd;
            var newWidth = runningActivity.currentAmount/runningActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            document.getElementById("runningBar").style.width = newWidth+'%';
            document.getElementById("runningBar").innerHTML = Math.round(newWidth)+'%';
            break;
        case "Walking":
            var amountToAdd = parseInt(document.getElementById("amountAddWalking").value);
            walkingActivity.currentAmount += amountToAdd;
            var newWidth = walkingActivity.currentAmount/walkingActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            document.getElementById("walkingBar").style.width = newWidth+'%';
            document.getElementById("walkingBar").innerHTML = Math.round(newWidth)+'%';
            break;
        case "WaterIntake":
            var amountToAdd = parseInt(document.getElementById("amountAddWaterIntake").value);
            waterIntakeActivity.currentAmount += amountToAdd;
            var newWidth = waterIntakeActivity.currentAmount/waterIntakeActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            document.getElementById("waterIntakeBar").style.width = newWidth+'%';
            document.getElementById("waterIntakeBar").innerHTML = Math.round(newWidth)+'%';
            break;
        case "HoursOfSleep":
            var amountToAdd = parseInt(document.getElementById("amountAddHoursOfSleep").value);
            hoursOfSleepActivity.currentAmount += amountToAdd;
            var newWidth = hoursOfSleepActivity.currentAmount/hoursOfSleepActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            document.getElementById("hoursOfSleepBar").style.width = newWidth+'%';
            document.getElementById("hoursOfSleepBar").innerHTML = Math.round(newWidth)+'%';
            break;
        case "CalorieIntake":
            var amountToAdd = parseInt(document.getElementById("amountAddCalorieIntake").value);
            calorieIntakeActivity.currentAmount += amountToAdd;
            var newWidth = calorieIntakeActivity.currentAmount/calorieIntakeActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            document.getElementById("calorieIntakeBar").style.width = newWidth+'%';
            document.getElementById("calorieIntakeBar").innerHTML = Math.round(newWidth)+'%';
            break;
    }
}

function saveSettings() {
    
    switch (currentActivity) {
        case "Running":
            var goalC = parseInt(document.getElementById("goalChangeRunning").value);
            var unitsC = document.getElementById("unitsChangeRunning").value;
            var streakC = parseInt(document.getElementById("streakAmountChangeRunning").value);
            runningActivity.amountReqGoal = goalC;
            runningActivity.defaultUnits = unitsC;
            runningActivity.daysPerWeekGoal = streakC;
            var newWidth = runningActivity.currentAmount/runningActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            if (newWidth != 0) {
                document.getElementById("runningBar").style.width = newWidth+'%';
                document.getElementById("runningBar").innerHTML = Math.round(newWidth)+'%';
            }
            break;
        case "Walking":
            var goalC = parseInt(document.getElementById("goalChangeWalking").value);
            var unitsC = document.getElementById("unitsChangeWalking").value;
            var streakC = parseInt(document.getElementById("streakAmountChangeWalking").value);
            walkingActivity.amountReqGoal = goalC;
            walkingActivity.defaultUnits = unitsC;
            walkingActivity.daysPerWeekGoal = streakC;
            var newWidth = walkingActivity.currentAmount/walkingActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            if (newWidth != 0) {
                document.getElementById("walkingBar").style.width = newWidth+'%';
                document.getElementById("walkingBar").innerHTML = Math.round(newWidth)+'%'; 
            }
            break;
        case "WaterIntake":
            var goalC = parseInt(document.getElementById("goalChangeWaterIntake").value);
            var unitsC = document.getElementById("unitsChangeWaterIntake").value;
            var streakC = parseInt(document.getElementById("streakAmountChangeWaterIntake").value);
            waterIntakeActivity.amountReqGoal = goalC;
            waterIntakeActivity.defaultUnits = unitsC;
            waterIntakeActivity.daysPerWeekGoal = streakC;
            var newWidth = waterIntakeActivity.currentAmount/waterIntakeActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            if (newWidth != 0) {
                document.getElementById("waterIntakeBar").style.width = newWidth+'%';
                document.getElementById("waterIntakeBar").innerHTML = Math.round(newWidth)+'%';
            }
            break;
        case "HoursOfSleep":
            var goalC = parseInt(document.getElementById("goalChangeHoursOfSleep").value);
            var unitsC = document.getElementById("unitsChangeHoursOfSleep").value;
            var streakC = parseInt(document.getElementById("streakAmountChangeHoursOfSleep").value);
            hoursOfSleepActivity.amountReqGoal = goalC;
            hoursOfSleepActivity.defaultUnits = unitsC;
            hoursOfSleepActivity.daysPerWeekGoal = streakC;
            var newWidth = hoursOfSleepActivity.currentAmount/hoursOfSleepActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            if (newWidth != 0) {
                document.getElementById("hoursOfSleepBar").style.width = newWidth+'%';
                document.getElementById("hoursOfSleepBar").innerHTML = Math.round(newWidth)+'%';
            }
            break;
        case "CalorieIntake":
            var goalC = parseInt(document.getElementById("goalChangeCalorieIntake").value);
            var unitsC = document.getElementById("unitsChangeCalorieIntake").value;
            var streakC = parseInt(document.getElementById("streakAmountChangeCalorieIntake").value);
            calorieIntakeActivity.amountReqGoal = goalC;
            calorieIntakeActivity.defaultUnits = unitsC;
            calorieIntakeActivity.daysPerWeekGoal = streakC;
            var newWidth = calorieIntakeActivity.currentAmount/calorieIntakeActivity.amountReqGoal;
            newWidth = newWidth*100;
            if (newWidth > 100) {newWidth=100;}
            if (newWidth != 0) {
                document.getElementById("calorieIntakeBar").style.width = newWidth+'%';
                document.getElementById("calorieIntakeBar").innerHTML = Math.round(newWidth)+'%';
            }
            break;
    }
}

function setToRunning () {
    currentActivity = "Running";
}

function setToWalking () {
    currentActivity = "Walking";
}

function setToWaterIntake () {
    currentActivity = "WaterIntake";
}

function setToHoursOfSleep () {
    currentActivity = "HoursOfSleep";
}

function setToCalorieIntake () {
    currentActivity = "CalorieIntake";
}


function printObject(o) {
  var out = '';
  for (var p in o) {
    out += p + ': ' + o[p] + '\n';
  }
  alert(out);
}

function printAll ( ) {
    printObject(runningActivity);
    printObject(walkingActivity);
    printObject(waterIntakeActivity);
    printObject(hoursOfSleepActivity);
    printObject(calorieIntakeActivity);
}


// sets the date at the top left of the window
//function getDate()
  //  {
    //    var d = new Date();
    //    document.getElementById("date").innerHTML = d.toDateString();
   // } 
//getDate();




