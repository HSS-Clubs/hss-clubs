function getAllClubs(){
$.ajax({
	url: "queries.php",
	cache: false,
	type: "POST",
	success: function(res) {
		var data = JSON.parse(res);
		listContent = ``
		for (i = 0; i < data.length; i++) {
			colors=["#BAD4AA","#EDB458"];
			var name = data[i]["name"];            
			console.log(data[i])
			console.log(name)
			var bio = data[i]["bio"];
			var link = data[i]["link"];
			var advisor = data[i]["advisor"];
			var website = data[i]["website"];	
			color=colors[i];
			listContent +=`<div class="course">
			  <div style="background-color:${color}"class="preview square d-flex flex-column align-items-center">
			  <h6>Humanities</h6>
			  <h2 style="text-align:center">${name}</h2>
			  <div class="row">
				  <!-- <div class="col-sm-2"></div> -->
				  <div class="col-sm-12">
					  <img class="rounded-circle img-fluid" alt="100x100" src="imgs/Debate.png"
					  data-holder-rendered="true">
				  </div>
				  <!-- <div class="col-sm-2"></div> -->
			  </div>
			  </div>
			  <div class="info">
			  
			  <h2>${name}</h2>
			  <p class="p-trunc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis officiis dolore odio unde et voluptate blanditiis praesentium libero, quae quas, excepturi neque quaerat atque, illo eaque sed cum nisi ducimus.</p>
			  <button style="outline:none;"class="cardButton">Learn More</button>
			  </div>
		  </div>`
		}
		// newContent+=`</tbody></table>`;
		document.getElementById("all_clubs").innerHTML = listContent;
		// document.getElementById("main-content").innerHTML = newContent;
	}
	
});
}