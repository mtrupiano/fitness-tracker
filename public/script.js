$( () => {
    $('.modal').modal();

    // $('input.autocomplete').autocomplete({
    //     data: 
    // })

    $('.new-exercise-type').on('input', (event) => {
        const target = $(event.target);
        const workoutID = target.attr('data-workout-id');
        console.log(target.val())
        if (target.val().toLowerCase() === 'cardio') {
            $(`#new-exercise-for-workout-${workoutID}-weight`).prop('disabled', true);
            $(`#new-exercise-for-workout-${workoutID}-sets`).prop('disabled', true);
            $(`#new-exercise-for-workout-${workoutID}-reps`).prop('disabled', true);
        }
    });

    $('.new-exercise-add').on('click', (event) => {
        event.stopPropagation();
        const target = $(event.target);
        const workoutID = target.attr('data-workout-id');

        const name = $(`#new-exercise-for-workout-${workoutID}-name`).val().trim();
        const type = $(`#new-exercise-for-workout-${workoutID}-type`).val().trim();
        const weight = $(`#new-exercise-for-workout-${workoutID}-weight`).val();
        const sets = $(`#new-exercise-for-workout-${workoutID}-sets`).val();
        const reps = $(`#new-exercise-for-workout-${workoutID}-reps`).val();

        $.ajax({
            url: '/exercise',
            method: 'POST',
            data: {
                name, type, weight, sets, reps, workoutID
            }
        }).then( (res) => {
            location.reload();
        }).fail( (err) => {
            alert(err.responseText);
        })
    });

    $('.delete-exercise-btn').on('click', (event) => {
        const target = $(event.target);
        const id = target.attr('data-id');
        $.ajax({
            url: '/exercise/' + id,
            method: 'DELETE',
        }).then( (res) => {
            location.reload();
        }).fail( (err) => {
            console.log(err);
        })
    });


    $('.delete-workout-btn').on('click', (event) => {
        const target = $(event.target);
        const id = target.attr('data-id');
        $.ajax({
            url: '/workout/' + id,
            method: 'DELETE',
        }).then((res) => {
            location.reload();
        }).fail((err) => {
            console.log(err);
        })
    });
});