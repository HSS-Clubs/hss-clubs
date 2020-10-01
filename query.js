function getAllClubs(){
	var dataSet = {userID:sessionStorage.getItem('userID'),idverify:sessionStorage.getItem('verifyid')}	
$.ajax({
	url: "queries.php",
	cache: false,
	type: "POST",
	data: {type:"allClubs",parameters:dataSet},
	success: function(res) {
		if(res.substring(res.length-13)=="invalid login"){
			sessionInvalid()
		}
		var data = JSON.parse(res);
		// if(res="")
		// console.log(data)
		listContent = ``
		for (i = 0; i < data.length; i++) {
			colors=["#BAD4AA","#EDB458"];
			var name = data[i]["name"];            

			var bio = data[i]["bio"];
			var id = data[i]["id"];
			var link = data[i]["link"];
			var advisor = data[i]["advisor"];
			var volunteer = data[i]["volunteer"];
			var genre = data[i]["genre"];
			var website = data[i]["website"];	
			var email = data[i]["email"];
			var isMember = data[i]["isMember"];
			var joinButton = "JOIN";
			var disabledButton = "";
			if(isMember == "y"){
				joinButton="JOINED"
				disabledButton = "disabled";
			}
			color=colors[(parseInt(id)+2)%2];
			// console.log(typeof parseInt(id))
			if(volunteer=="true"){
				volunteer="checked";
			}
			else{
				volunteer="unchecked";
			}
			if(advisor=="true"){
				advisor="checked";
			}
			else{
				advisor="unchecked";
			}
			listContent +=`<div class="container tab-pane  active pt-5" id="nav-bio" role="tabpanel" aria-labelledby="nav-bio-tab" style="text-align:left;">
			<div class="card" style="border-radius:5x;">
			  <div class="square card-header border-0" style="text-align:center;background-color:${color} ;color:white;">
				  <h6 style="text-align:center;text-transform:uppercase;">${genre}</h6>
				  <div style="text-align:center;"><h2 style="text-align:center;">${name}</h2></div>
				  <div class="row">
					  <div class="col-sm-12">
						  <img class="rounded-circle img-fluid" alt="100x100" src="imgs/debate.png" height="120vh" width="120vw"
						  data-holder-rendered="true">
					  </div>
				  </div>
			  </div>
			  <div class="card-body px-2" style="flex-wrap:wrap;">
				  <div class="container">
					<div class="row">
					  <div class="col-sm-9">
						<p class="card-text" style="">praesentium libero, quae quas, excepturi neque quaerat atque, illo eaque sed cum nisi ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis officiis dolore odio unde et voluptate blanditiis praesentium libero, quae quas, excepturi neque quaerat atque, illo eaque sed cum nisi ducimus.</p>
					<a href="javascript:void(0)"onclick="userJoinClub(${id})"  class="btn ${disabledButton} cardBtn btn-primary pull-left content-desktop">${joinButton}</a>
					  </div>
					  <div class="col-sm-3 d-flex d-row flex-column align-items-center justify-content-left" style="text-align:left;">
						<h1 style="font-size:13px;">Club E-mail: <a style="font-size:13px;"href="mailto:${email}">${email}</a> </h1>
						<p style="margin-bottom:0;"><strong>Classroom Code: </strong>${link}</p>
						<div>
						  <input class="form-check-input" type="checkbox" ${advisor} disabled value="" id="defaultCheck1">
						  <label class="form-check-label" for="defaultCheck1">
							Advisor Run
						  </label>
						</div>
						<div>
						  <input class="form-check-input" ${volunteer} disabled type="checkbox" value="" id="defaultCheck2">
						  <label class="form-check-label" for="defaultCheck2">
							Community Service
						  </label>
						</div>
						<a href="javascript:void(0)" onclick="userJoinClub(${id})"  class="btn ${disabledButton} cardBtn btn-primary pull-left content-mobile" style="text-align:center;margin-top:10px;" >${joinButton}</a>
					  </div>
					</div>
				  </div>
			  </div>
		  </div>
		  
		  </div>`
		}
		// newContent+=`</tbody></table>`;

		document.getElementById("nav-tabContent").innerHTML = listContent;
		// document.getElementById("main-content").innerHTML = newContent;
	}
});
}
function userClubs(){
	var dataSet = {userID:sessionStorage.getItem('userID'),idverify:sessionStorage.getItem('verifyid')}	
	// console.log(dataSet)
	$.ajax({
		url: "queries.php",
		cache: false,
		type: "POST",
		data: {type:"getUserClubs",parameters:dataSet},
		success: function(res) {
			// console.log(res)
			if(res.substring(res.length-13)=="invalid login"){
				sessionInvalid()
			}
			listContent = ``
			if(res=="empty"){
				console.log("no vals")
				listContent+=`<h1 class="emptyTab" >Go to The All Clubs Tab to Start Joining Clubs!</h1>`
			}
			else{
			var data = JSON.parse(res);
			for (i = 0; i < data.length; i++) {
				colors=["#BAD4AA","#EDB458"];
				var name = data[i]["name"];            
				// console.log(data[i])
				// console.log(name)
				var bio = data[i]["bio"];
				var id = data[i]["id"];
				var link = data[i]["link"];
				var advisor = data[i]["advisor"];
				var volunteer = data[i]["volunteer"];
				var genre = data[i]["genre"];
				var website = data[i]["website"];	
				var email = data[i]["email"];

				color=colors[(parseInt(id)+2)%2];
				if(volunteer=="true"){
					volunteer="checked";
				}
				else{
					volunteer="unchecked";
				}
				if(advisor=="true"){
					advisor="checked";
				}
				else{
					advisor="unchecked";
				}
				// console.log(advisor)
	
				// console.log(volunteer)
				// ${color}
				listContent +=`
				<div class="container tab-pane  active pt-5" id="nav-bio" role="tabpanel" aria-labelledby="nav-bio-tab" style="text-align:left;">
				<div class="card" style="border-radius:5x;">
				  <div class="square card-header border-0" style="text-align:center;background-color:${color} ;color:white;">
					  <h6 style="text-align:center;text-transform:uppercase;">${genre}</h6>
					  <div style="text-align:center;"><h2 style="text-align:center;">${name}</h2></div>
					  <div class="row">
						  <div class="col-sm-12">
							  <img class="rounded-circle img-fluid" alt="100x100" src="imgs/debate.png" height="120vh" width="120vw"
							  data-holder-rendered="true">
						  </div>
					  </div>
				  </div>
				  <div class="card-body px-2" style="flex-wrap:wrap;">
					  <div class="container">
						<div class="row">
						  <div class="col-sm-9">
							<p class="card-text" style="">praesentium libero, quae quas, excepturi neque quaerat atque, illo eaque sed cum nisi ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis officiis dolore odio unde et voluptate blanditiis praesentium libero, quae quas, excepturi neque quaerat atque, illo eaque sed cum nisi ducimus.</p>
						<a href="javascript:void(0)" onclick="userLeaveClub(${id})"class="btn cardBtn btn-danger pull-left content-desktop">LEAVE</a>
						  </div>
						  <div class="col-sm-3 d-flex d-row flex-column align-items-center justify-content-left" style="text-align:left;">
							<h1 style="font-size:13px;">Club E-mail: <a style="font-size:13px;"href="mailto:${email}">${email}</a> </h1>
							<p style="margin-bottom:0;"><strong>Classroom Code: </strong>${link}</p>
							<div>
							  <input class="form-check-input" type="checkbox" ${advisor} disabled value="" id="defaultCheck1">
							  <label class="form-check-label" for="defaultCheck1">
								Advisor Run
							  </label>
							</div>
							<div>
							  <input class="form-check-input" ${volunteer} disabled type="checkbox" value="" id="defaultCheck2">
							  <label class="form-check-label" for="defaultCheck2">
								Community Service
							  </label>
							</div>
							<a href="javascript:void(0)" onclick="userLeaveClub(${id})"class="btn cardBtn btn-danger pull-left content-mobile" style="text-align:center;margin-top:10px;">LEAVE</a>
						  </div>
						</div>
					  </div>
				  </div>
			  </div>
			  
			  </div>`
			}
		}
			// newContent+=`</tbody></table>`;
			// 
			document.getElementById("nav-tabContent").innerHTML = listContent;
			// document.getElementById("main-content").innerHTML = newContent;
		}
	});
}
function userSignIn(nameVal, emailVal){
	var dataSet = {name: nameVal, email: emailVal, idverify:sessionStorage.getItem('verifyid')}
	$.ajax({
		url: "queries.php",
		cache: false,
		type: "POST",
		data: {type:"userLogIn",parameters:dataSet},
		success: function(res) {
			// console.log(typeof res)
			var data = JSON.parse(res)
			var id = parseInt(data[0]["id"])
		
			sessionStorage.setItem('userID',id);
			loggedIn()
		}
	}); 
}
function addClub(idVal){
	var dataSet = {id: idVal, idverify:sessionStorage.getItem('verifyid')}
	$.ajax({
		url: "queries.php",
		cache: false,
		type: "POST",
		data: {type:"addClub",parameters:dataSet},
		success: function(res) {
			// console.log(res)
		}
	});
}

function clubLogIn(){
	var emailVal = document.getElementById("inputEmail").value
	var passwordVal = document.getElementById("inputPassword").value
	var dataSet = {email: emailVal, password:passwordVal}
	$.ajax({
		url: "queries.php",
		cache: false,
		type: "POST",
		data: {type:"clubLogIn",parameters:dataSet},
		success: function(res) {
			sessionStorage.setItem("clubTempID", "logidlolnooneknwos");
			if(res.substring(0,5)=="valid"){
				// console.log(res.substring(5))
				getMembers(res.substring(5))
				clubDetails(res.substring(5))
				memberList()
			}
			else{
				// console.log(res)
			}
		}
	});
}
function getMembers(id){
	// console.log(parseInt(id))
	var dataSet = {clubId: id}
	$.ajax({
		url: "queries.php",
		cache: false,
		type: "POST",
		data: {type:"getMemberList",parameters:dataSet},
		success: function(res) {
			// console.log(res)
			var data = JSON.parse(res);
			var memberArray = [];
			for (i = 0; i < data.length; i++) {
				var memberSpecific = [];
				var name = data[i]["name"];            
				var email = data[i]["email"];
				memberSpecific.push(name);
				memberSpecific.push(email);
				// console.log(memberSpecific)
				memberArray.push(memberSpecific);          				
			}
			// console.log(memberArray);
			datatable.clear().draw();
			datatable.rows.add(memberArray);
			datatable.columns.adjust().draw();
		}
	});
}
function clubDetails(id){
	var dataSet = {clubId: id}
	$.ajax({
		url: "queries.php",
		cache: false,
		type: "POST",
		data: {type:"getClubDetails",parameters:dataSet},
		success: function(res) {
			var obj = JSON.parse(res)
			console.log(obj)
			document.getElementById("inputName").value = obj[0]["name"];
			document.getElementById("inputGenre").value = obj[0]["genre"];
			if(obj[0]["advisor"]!="false"){
				document.getElementById("gridCheck2").checked = true;;
			}
			else{
				document.getElementById("gridCheck2").checked = false;
			}
			if(obj[0]["vhours"]!="false"){
				document.getElementById("gridCheck").checked = true;;
			}
			else{
				document.getElementById("gridCheck").checked = false;
			}
			document.getElementById("ClubBio").value = obj[0]["bio"];
			document.getElementById("ClubOfficers").value = obj[0]["officers"];
			document.getElementById("ClubWebsite").value = obj[0]["website"];
			document.getElementById("ClubCode").value = obj[0]["classroom"];
			document.getElementById("saveButton").value= id;
		}
	});
}
function updateClub(){
	if(document.getElementById("saveButton").value!="notAssigned"){
	var nameVal = document.getElementById("inputName").value;
	var genreVal = document.getElementById("inputGenre").value;
	var advisorVal = document.getElementById("gridCheck2").checked;
	var volunteerVal = document.getElementById("gridCheck").checked;
	var clubBio = document.getElementById("ClubBio").value ;
	var clubOfficers = document.getElementById("ClubOfficers").value;
	var clubWebsite = document.getElementById("ClubWebsite").value;
	var clubCode = document.getElementById("ClubCode").value;

	var formdata = {name: nameVal, genre: genreVal, advisor:advisorVal,volunteer:volunteerVal, bio: clubBio, officers:clubOfficers, website: clubWebsite, code: clubCode}
	var dataSet = {clubId: document.getElementById("saveButton").value, formData: formdata}
	$.ajax({
		url: "queries.php",
		cache: false,
		type: "POST",
		data: {type:"updateClub",parameters:dataSet},
		success: function(res) {
			// console.log(res)
		}
});
}
else{
console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
}
}
function userJoinClub(clubIdVal){
	// console.log(clubIdVal)
	var dataSet = {clubID:clubIdVal, userID:sessionStorage.getItem('userID'), idverify:sessionStorage.getItem('verifyid')}
	// console.log(dataSet)
	$.ajax({
		url: "queries.php",
		cache: false,
		type: "POST",
		data: {type:"userJoinClub",parameters:dataSet},
		success: function(res) {
			if(res.substring(res.length-13)=="invalid login"){
				sessionInvalid()
			}
			// console.log(res)
			getAllClubs()
		}
	});
}
function userLeaveClub(clubIdVal){
	// console.log(clubIdVal)
	var dataSet = {clubID:clubIdVal, userID:sessionStorage.getItem('userID'), idverify:sessionStorage.getItem('verifyid')}
	// console.log(dataSet)
	$.ajax({
		
		url: "queries.php",
		cache: false,
		type: "POST",
		data: {type:"userLeaveClub",parameters:dataSet},
		success: function(res) {
			if(res.substring(res.length-13)=="invalid login"){
				sessionInvalid()
			}
			// console.log(res)
			userClubs();
		}
	});
}
function sessionInvalid(){
	signOut()
	loggedOut()
	sessionMessage()
}
function sessionMessage(){
	alert("invalid session")
}