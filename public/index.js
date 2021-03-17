$(document).ready(function(){
	$('#example').DataTable( {
			ajax: {
				url: 'http://localhost:3001/api/v1/todos',
				dataSrc: ''
			},
			columns: [ 
				{ data: 'id'},
				{ data: 'title' },
				{ data: 'content' },
				{
					data: null,
					className: "center",
					defaultContent: '<a href="javascript:void(0);" class="editor_edit">Edit</a> / <a href="" class="editor_remove">Delete</a>'
				}
			]
	});


	$('#add-item').on('click', () => {
		$.ajax({
			url:'http://localhost:3001/api/v1/todos',
			type:'POST',
			data: {
				todo: {
					title : $('#input-name').val(),
					content: $('#input-price').val()
				}
			}
		})
		.done((data) => {
			$('.modal').modal('hide');
			$('#example').DataTable().ajax.reload();
			$('#input-name').val(''),
			$('#input-price').val('')
		})
		.fail((data) => {
			console.log(data);
		})
	})

	// Edit
	$('#example').on( 'click', '.editor_edit', function (e) {
		e.preventDefault();
		var tr = $(this).closest('tr');
		var id = tr.children('td:eq(0)').text(); //get the text from first col of current row
		$('#editItemModal').modal('show');
		var editTitle = tr.children('td:eq(1)').text();
		var editContent = tr.children('td:eq(2)').text();
		$('#edit-input-name').val(editTitle);
		$('#edit-input-price').val(editContent);
		$('#edit-item').on('click', (event) => {
			$.ajax({
				url : `http://localhost:3001/api/v1/todos/${id}`,
				type : 'PATCH',
				data: {
					todo: {
						title : $('#edit-input-name').val(),
						content: $('#edit-input-price').val()
					}
				}
			})
			.done((data) => {
				$('.modal').modal('hide');
				$('#example').DataTable().ajax.reload();
			})
			.fail((data) => {
				console.log(data);
			})
			})
		});

	// Delete

	$('#example').on( 'click', '.editor_remove', function (e) {
		e.preventDefault();
		if (!window.confirm("Are you sure?")) {
			return;
		}
		//var id = table.row( this ).data().id;
		var tr = $(this).closest('tr');
		var id = tr.children('td:eq(0)').text(); //get the text from first col of current row
		$.ajax({
			url : `http://localhost:3001/api/v1/todos/${id}`,
			type : 'DELETE',
			data : {
				authenticity_token : $('meta[name=csrf-token]').attr('content')
			}
		})
		.done((result) => {
			$('#example').DataTable().ajax.reload();

		})
		.fail((data) => {
			console.log(data);
		})
	});
});