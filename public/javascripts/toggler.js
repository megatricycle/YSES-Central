$(document).ready(function(){

	var more_content =''+
	'<div class="box">'+
		'<div id="more-data">'+
			'<div class="row">'+
				'<div class="table-title">'+
					'<strong>MORE<span class="glyphicon glyphicon-th-list"></span></strong>'+
				'</div>'+
				'<hr/>'+
			'</div>'+
		'</div>'+
	'</div>';

	window.onload = $('#box-data').slideDown(1);

	$("#about").off('click');
	$("#about").on('click',function(){
		var about_content =
		'<div class="box">'+
			'<div id="about-data">'+
				'<div class="table-title">'+
					'<strong>DETAILS'+
						'<span class="glyphicon glyphicon-user"></span>'+
					'</strong>'+
				'</div>'+
				'<table class="table table-hover">'+
				'</table>'+
			'</div>'+
		'</div>';

		$('#box-data').html(about_content);

		//about
		$.ajax({
			url: "/getdetails",
			data: "account="+location.pathname.substring(9),
			type: "GET",
			success: function (res) {
				function rowHTML(first,second){
					var classData = '';
					var data = '';

					switch(first){
						case 'First name': classData = 'text'; data = 'first_name'; break;
						case 'Middle name': classData = 'text'; data = 'middle_name'; break;
						case 'Last name': classData = 'text'; data = 'last_name'; break;
						case 'University Batch': classData = 'text'; data = 'univ_batch'; break;
						case 'Home Address': classData = 'text'; data = 'home_address'; break;
						case 'College Address': classData = 'text'; data = 'college_address'; break;
						case 'Organization Classification': classData = 'org_class'; data = 'org_class'; break;
						case 'Department': classData = 'department'; data = 'department'; break;
						case 'Position': classData = 'position'; data = 'exec_position'; break;
						case 'Student Number': classData = 'studentnumber'; data = 'student_number'; break;
						case 'Organization Batch': classData = 'org_batch'; data = 'org_batch'; break;
						case 'Birthday': classData = 'birthdate'; data = 'birthday'; break;
						default: classData = ''; break;

					}

					var edit = res["owner"]=="true"?'<td>'+'<a class="edit">Edit</a>'+'</td>':"";

					var html = ''+
						'<tr class="'+classData+'" data-name="'+data+'">'+
							'<td>'+first+'</td>'+
							'<td>'+second+'</td>'+
							edit+ //only appears if account has valid powers to edit
						'</tr>';

					return html;
				}

				res = safe_tags(res);

				$("#about-data table").append(rowHTML("First name",res["first_name"]));
				$("#about-data table").append(rowHTML("Middle name",res["middle_name"]));
				$("#about-data table").append(rowHTML("Last name",res["last_name"]));
				$("#about-data table").append(rowHTML("Organization Classification",res["org_class"]));
				$("#about-data table").append(rowHTML("Department",res["department"]));
				if(res["exec_position"]){
					$("#about-data table").append(rowHTML("Position",res["exec_position"]));
				}
				$("#about-data table").append(rowHTML("Student Number",res["student_number"]));
				$("#about-data table").append(rowHTML("Organization Batch",res["org_batch"]));
				$("#about-data table").append(rowHTML("University Batch",res["univ_batch"]));
				$("#about-data table").append(rowHTML("Birthday",res["birthday"]));
				$("#about-data table").append(rowHTML("Home Address",res["home_address"]));
				$("#about-data table").append(rowHTML("College Address",res["college_address"]));
			},
			error: function (e){
				console.dir(e);
			}
		});

	});

	$("#mentor").off('click');
	$("#mentor").on('click',function(){

		//fetch mentee content via ajax
		$.ajax({
			url: "/getmentor",
			data: "account="+location.pathname.substring(9),
			type: "GET",
			success: function (res) {
				res = safe_tags(res);

				if(res["status"] == "None"){
					var mentor_content =''+
					'<div class="box">'+
						'<div id="mentor-data">'+
							'<div class="row">'+
								'<div class="table-title">'+
									'<strong>MENTOR</strong>'+
									'<span class="glyphicon glyphicon-eye-open"></span>'+
								'</div>'+
								'<hr/>'+
							'</div>'+
							'<div class="row">'+
								'<div class="mentor-data-content">'+
									'<div class="mentor-data-content-image">'+
										'<img src="/images/unknownpic.jpg" class="img-responsive"/>'+
									'</div>'+
									'<div class="mentor-data-content-text">'+
										'<table class="table table-hover">'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Name: </strong>'+
												'</td>'+
												'<td>'+
													'<p>'+ res["full_name"] +'</p>'+
												'</td>'+
											'</tr>'+
										'</table>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';

					$('#box-data').html(mentor_content);
				}
				else{
					var mentor_content =''+
					'<div class="box">'+
						'<div id="mentor-data">'+
							'<div class="row">'+
								'<div class="table-title">'+
									'<strong>MENTOR</strong>'+
									'<span class="glyphicon glyphicon-eye-open"></span>'+
								'</div>'+
								'<hr/>'+
							'</div>'+
							'<div class="row">'+
								'<div class="mentor-data-content">'+
									'<div class="mentor-data-content-image">'+
										'<img src="/'+ res["picture"] +'" class="img-responsive"/>'+
									'</div>'+
									'<div class="mentor-data-content-text">'+
										'<table class="table table-hover">'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Name: </strong>'+
												'</td>'+
												'<td>'+
													'<p>'+ res["full_name"] +'</p>'+
												'</td>'+
											'</tr>'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Classification: </strong>'+
												'</td>'+
												'<td>'+
													'<p>' + res["org_class"] + '</p>'+
												'</td>'+
											'</tr>'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Department: </strong>'+
												'</td>'+
												'<td>'+
													'<p>' + res["department"] + '</p>'+
												'</td>'+
											'</tr>'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Organization Batch: </strong>'+
												'</td>'+
												'<td>'+
													'<p>' + res["org_batch"] + '</p>'+
												'</td>'+
											'</tr>'+
										'</table>'+
									'</div>'+
								'</div>'+
								'<div class="mentor-navigation text-center">'+
									'<a id="classification">'+
										'<div class="mentor-link">'+
											'<p>Semtheng Here</p>'+
										'</div>'+
									'</a>'+
									'<a id="mentor-profile" href="/profile/'+ res["username"] +'">'+
										'<div class="mentor-link">'+
											'<p>Go to profile</p>'+
										'</div>'+
									'</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';

					$('#box-data').html(mentor_content);
				}
			},
			error: function (e){
				console.dir(e);
			}
		});
	});

	$("#mentee").off('click');
	$("#mentee").on('click',function(){
		var mentee_content ='<div class="box"><div id="mentee-data"><div class="row"><div class="table-title"><strong>MENTEE<span class="glyphicon glyphicon-leaf"></span></strong></div><hr/></div></div></div>';


		$(this).closest('#information').find('#box-data').html(mentee_content);

		//fetch mentee content via ajax
		$.ajax({
			url: "/getmentees",
			data: "account="+location.pathname.substring(9),
			type: "GET",
			success: function (res) {
				if(res == 242){
					//edit this
					$("#mentee-data").append("No mentees");
				}
				else{
					res = safe_tags(res);
					//mentees with accounts
					for(var i = 0; i < res.Accounts.length; i++){
						var middlename = res.Accounts[i]["middle_name"].split(" ");
						var middlenameinitials = "";
						for(var j = 0; j < middlename.length; j++){
							middlenameinitials = middlenameinitials.concat(middlename[j].substring(0,1));
						}
						var fullname = res.Accounts[i]["first_name"] + " " + middlenameinitials + ". " + res.Accounts[i]["last_name"];

						var menteeHTML = "<div class='row mentee-content'><a class='ajax' href='/profile/" + res.Accounts[i]["username"] +"'><div class='mentee-data-image'><img src='/" + res.Accounts[i]["picture"] + "' class='img-responsive'></div><div class='mentee-data-content text-left'><strong>" + fullname + "</strong><p>" + res.Accounts[i]["org_class"] + "</p><p>" + res.Accounts[i]["department"] + "</p></div></a></div>";
						$("#mentee-data").append(menteeHTML);
					}
					//mentees without Accounts
					for(var i = 0; i < res.noAccounts.length; i++){
						var menteeHTML = "<div class='row mentee-content'><div class='mentee-data-image'><img src='/images/unknownpic.jpg' class='img-responsive'></div><div class='mentee-data-content text-left'><strong>" + res.noAccounts[i] + "</strong></div>";
						$("#mentee-data").append(menteeHTML);
					}
				}
			},
			error: function (e){
				console.dir(e);
			}
		});
	});

	$("#more").off('click');
	$("#more").on('click',function(){
		$(this).closest('#information').find('#box-data').html(more_content);
	});

	var old_value = '';

	function dataChanges(old_value, data){
		//your data
		//data.parent().data('name')
		//your new value
		//data.text()
		if(old_value != data.text()){
			//send ajax request to edit data in the database
			$.ajax({
				url: "/editprofile",
				data: {
					account: location.pathname.substring(9),
					dataname: data.parent().data('name'),
					newdata: data.text(),
				},
				type: "POST",
				error: function (e){
					console.dir(e);
				}
			});
		}
	};

	$('body').off('click','.edit');

	/*EDIT DATA IN ABOUT*/
	$("body").on("click",".edit",function(){

			var data = $(this).closest("tr").find("td").first().next();
			old_value = data.text();

			$(this).html('Done');
			$(this).addClass('done');
			$(this).removeClass('edit');

			// will convert data to text box
			if($(this).parent().find("input").length > 0){
				alert("There are boxes");
			}
			else if($(this).closest('tr').hasClass('text')){
				data.each(function(index){
					var temphtml = ''+
						'<input type="text" value="'+$(this).html()+'">';
					$(this).html(temphtml);
				});
			}
			// will convert data to a datepicker
			else if($(this).closest('tr').hasClass('birthdate')){
				data.each(function(index){
					var temphtml = ''+
						'<input style="width:130px;height:20px;" type="date" value="'+$(this).html()+'">';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [org_class]
			else if($(this).closest('tr').hasClass('org_class')){
				data.each(function(index){
					var temphtml = ''+
						'<select id="org_class_select" name="org-class">'+
							'<option value="Active" >Active</option>'+
							'<option value="Inactive">Inactive</option>'+
							'<option value="Alumni">Alumni</option>'+
						'</select>';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [org_batch]
			else if($(this).closest('tr').hasClass('org_batch')){
				data.each(function(index){
					var temphtml = ''+
						'<select id="org_batch_select" name="org-batch">'+
							'<option value="Charter" >Charter</option>'+
							'<option value="Synergy">Synergy</option>'+
							'<option value="RAMpage">RAMpage</option>'+
						'</select>';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [department]
			else if($(this).closest('tr').hasClass('department')){
				data.each(function(index){
					var temphtml = ''+
						'<select id="department_select" name="department">'+
							'<optgroup label="Projects and Activities">'+
								'<option value="Junior Projects and Activities">Junior</option>'+
								'<option value="Senior Projects and Activities">Senior</option>'+
							'</optgroup>'+
							'<option value="Visuals and Logistics">Visuals and Logistics</option>'+
							'<option value="Secretariat">Secretariat</option>'+
							'<option value="Scholastics">Scholastics</option>'+
							'<option value="Finance">Finance</option>'+
							'<option value="Human Resources">Human Resources</option>'+
							'<option value="Executive">Executive (EO Only)</option>'+
						'</select>';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [position]
			else if($(this).closest('tr').hasClass('position')){
				data.each(function(index){
					var temphtml = ''+
						'<select  id="position_select"name="position">'+
							'<option value="Not an Executive Department Member">Not an Executive Department Member</option>'+
							'<option value="Deputy Executive Officer">Deputy Executive Officer</option>'+
							'<option value="Liaison Officer">Liaison Officer</option>'+
							'<option value="Visuals and Logistics Department Head">Visuals and Logistics Department Head</option>'+
							'<option value="Executive Assistant">Executive Assistant</option>'+
							'<option value="Scholastics Department Head">Scholastics Department Head</option>'+
							'<option value="Finance Department Head">Finance Department Head</option>'+
							'<option value="Human Resources Department Human">Human Resources Department Head</option>'+
							'<option value="Executive Officer">Executive Officer</option>'+
						'</select>';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [studentnumber]
			else if($(this).closest('tr').hasClass('studentnumber')){
				data.each(function(index){
					var temphtml = ''+
						'<input style="width:70px;" type="text" id="stud_year" maxlength=4 value="'+$(this).html().substring(0,4)+'">'+
						'<span> - </span>'+
						'<input style="width:70px;" type="text" id="stud_number" maxlength=5 value="'+$(this).html().substring(5)+'">';
					$(this).html(temphtml);
				});
			}

			data.find('input').off('keypress');
			data.find('input').on('keypress', function(e) {
				var code = e.keyCode || e.which;
				if(!$(this).closest('tr').hasClass('studentnumber')){
					var temphtml = ''+
						$(this).val();
				}else{
					var temphtml = ''+
						text.find('#stud_year').val()+
						'-'+
						text.find('#stud_number').val();
					$(this).html(temphtml);
				}
				if(code==13){
					$(this).closest("tr").find(".done").html('Edit');
					$(this).closest("tr").find(".done").addClass('edit');
					$(this).closest("tr").find(".done").removeClass('done');
					data.html(temphtml);
					dataChanges(old_value,data);
				}
			});
	});

	$('body').off('click','.done');

	$('body').on('click','.done', function(){

		var text = $(this).closest("tr");
		var data = text.find("td").first().next();
		var traversed = function(class_name){
			return text.hasClass(class_name);
		}

		if(traversed('text') || traversed('birthdate')){

			data.each(function(index){
				var temphtml = ''+
					text.find('input').val();
				$(this).html(temphtml);
			});
		}
		else if(traversed('org_class')
			|| traversed('org_batch')
			|| traversed('department')
			|| traversed('position')){
			data.each(function(index){
				var temphtml = ''+
					text.find('select').val();
				$(this).html(temphtml);
			});
		}
		else if(traversed('studentnumber')){
			data.each(function(index){
				var temphtml = ''+
					text.find('#stud_year').val()+
					'-'+
					text.find('#stud_number').val();
				$(this).html(temphtml);
			});
		}
		$(this).html('Edit');
		$(this).addClass('edit');
		$(this).removeClass('done');

		dataChanges(old_value,data);
	});

	// needs work. will revert input fields clicked outside it's container.
	$(document).mouseup(function (e){
		var container = $('.done');

		if ( (!container.is(e.target) && container.has(e.target).length === 0)){

		}
	});

	//listen for newaccount events
	socket.off('newaccount');
	socket.on('newaccount',function(res){
		var table_data_2 = ''+
			'<table class="table table-condensed table-hover">';
		var table_data_1 = '';
		var img = '';
		for(data in res){
			var tempData;

			switch(data){
				case 'username': 		tempData = 'Username'; break;
				case 'first_name': 		tempData = 'First Name'; break;
				case 'middle_name':  	tempData = 'Middle Name'; break;
				case 'last_name': 		tempData = 'Last Name'; break;
				case 'org_class': 		tempData = 'Organization Classification'; break;
				case 'department': 		tempData = 'Department'; break;
				case 'student_number': 	tempData = 'Student Number'; break;
				case 'org_batch': 		tempData = 'Organization Batch'; break;
				case 'univ_batch': 		tempData = 'University Batch'; break;
				case 'mentor': 			tempData = 'Mentor'; break;
				case 'birthday': 		tempData = 'Birthday'; break;
				case 'home_address': 	tempData = 'Home Address'; break;
				case 'college_address': tempData = 'College Address'; break;
				case 'exec_position': 	tempData = 'Executive Position'; break;
				default: 				tempData = ' '; break;
			}

			if(data == "mentee"){
				var counter = 0;
				var temphtml = '';
				for(var j = 0; j < res["mentee"].length; j++){
					if(counter == 0){
						var temphtml2 = ''+
							'<tr class="text" data-mentee="'+res["mentee"][j]+'">'+
								'<td>'+
									'Mentees'+
								'</td>'+
								'<td>'+res["mentee"][j]+'</td>'+
								'<td>'+'<a class="edit">Edit</a>'+'</td>'+
							'</tr>';
						counter += 1;
					} else{
						var temphtml2 = ''+
							'<tr class="text" data-mentee="'+res["mentee"][j]+'">'+
								'<td>'+
								'</td>'+
								'<td>'+res["mentee"][j]+'</td>'+
								'<td>'+'<a class="edit">Edit</a>'+'</td>'+
							'</tr>';
					}
					temphtml = temphtml.concat(temphtml2);
				}
				table_data_1 = table_data_1.concat(temphtml);
			}
			else if(data == "mentor"
				|| data == "username"
				|| data == "department"
				|| data == "org_batch"
				|| data == "org_class"
				|| data == "exec_position"
				|| data == "picture"
			){

				if(data == "exec_position"){
					var position;

					if(res['exec_position'] == null) position = 'Not an Executive Department Member';
					else position = res['exec_position'];

					var temphtml = ''+
						'<tr class="position" data-'+'exec-position'+'="'+res['exec_position']+'">'+
							'<td>'+'Executive Position'+'</td>'+
							'<td>'+position+'</td>'+
							'<td>'+'<a class="edit">Edit</a>'+'</td>'+
						'</tr>';
					table_data_1 = '<table class="table table-condensed table-hover">' + temphtml + table_data_1;
				} else if(data == "picture"){
					var temphtml = ''+
						'<div data-'+data+'="'+res["picture"]+'" class="account-image">'+
							'<img src="/'+res["picture"]+'"/>'+
						'</div>';
					img = img.concat(temphtml);
				} else{
					var data_class;

					switch(data){
						case "department": 	data_class = 'department'; break;
						case "org_batch": 	data_class = 'org_batch'; break;
						case "org_class": 	data_class = 'org_class'; break;
						default: 			data_class = 'text'; break;
					}

					var temphtml = ''+
						'<tr class="'+data_class+'" data-'+data+'="'+res[data]+'">'+
							'<td>'+tempData+'</td>'+
							'<td>'+res[data]+'</td>'+
							'<td>'+'<a class="edit">Edit</a>'+'</td>'+
						'</tr>';
					table_data_1 = table_data_1.concat(temphtml);
				}
			}
			else{
				var data_class;

				switch(data){
					case "student_number": 	data_class = 'studentnumber'; break;
					case "birthday": 		data_class = 'birthdate'; break;
					default: 				data_class = 'text'; break;
				}

				var temphtml = ''+
					'<tr class="'+data_class+'" data-'+data+'="'+res[data]+'">'+
						'<td>'+tempData+'</td>'+
						'<td>'+res[data]+'</td>'+
						'<td>'+'<a class="edit">Edit</a>'+'</td>'+
					'</tr>';
				table_data_2 = table_data_2.concat(temphtml);
			}
		}
		var html = ''+
			'<div data-username="'+res['username']+'" class="to-validate">'+
				img+
				'<h3 style="float:left;font-weight:bold;padding-top:0px">'+res['first_name']+' '+res['last_name']+'</h3>'+
				'<span style="float:left;padding-top:29px;margin-left:10px;">'+res['department']+' Department'+'</span>'+
				'<div class="account-data">'+
					table_data_2+'</table>'+
					table_data_1+'</table>'+
				'</div>'+
				'<div class="to-validate-button">'+
					'<button class="pull-down accept">ACCEPT</button>'+
					'<button class="pull-down reject">REJECT</button>'+
				'</div>'+
			'</div>';
		$("#temp").append(html);
		alert("NEW ACCOUNT. DO SOME FANCY STUFFS");
	});
});
