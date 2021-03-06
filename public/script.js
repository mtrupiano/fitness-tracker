$( () => {
    $('.modal').modal();

    // Handle submitting a new workout
    $('#submit-new-workout-btn').on('click', (event) => {
        $.ajax({
            url: '/workout',
            method: 'POST',
            data: {
                name: $('#new-workout-name-input').val().trim()
            }
        }).then( (res) => {
            location.reload();
        }).fail( (err) => {
            alert(err.responseText);
        });
    });
    
    // Handle adding an exercise from the form in each workout plan list
    $('.new-exercise-add').on('click', (event) => {
        event.stopPropagation();
        const target = $(event.target);
        const workoutID = target.attr('data-workout-id');
        
        const name = $(`#new-exercise-for-workout-${workoutID}-name`).val().trim();
        const type = $(`#new-exercise-for-workout-${workoutID}-type`).val().trim();
        const weight = $(`#new-exercise-for-workout-${workoutID}-weight`).val();
        const sets = $(`#new-exercise-for-workout-${workoutID}-sets`).val();
        const reps = $(`#new-exercise-for-workout-${workoutID}-reps`).val();
        const duration = $(`#new-exercise-for-workout-${workoutID}-duration`).val();
        
        $.ajax({
            url: '/exercise',
            method: 'POST',
            data: {
                name, type, weight, sets, reps, duration, workoutID
            }
        }).then( (res) => {
            location.reload();
        }).fail( (err) => {
            alert(err.responseText);
        })
    });

    // Handle clearing the new exercise form
    $('.new-exercise-clear').on('click', (event) => {
        const target = $(event.target);
        const workoutID = target.attr('data-workout-id');

        $(`#new-exercise-for-workout-${workoutID}-name`).val('');
        $(`#new-exercise-for-workout-${workoutID}-type`).val('');
        $(`#new-exercise-for-workout-${workoutID}-weight`).val('');
        $(`#new-exercise-for-workout-${workoutID}-sets`).val('');
        $(`#new-exercise-for-workout-${workoutID}-reps`).val('');
        $(`#new-exercise-for-workout-${workoutID}-duration`).val('');

        $(`#new-exercise-for-workout-${workoutID}-weight`).prop('disabled', false);
        $(`#new-exercise-for-workout-${workoutID}-sets`).prop('disabled', false);
        $(`#new-exercise-for-workout-${workoutID}-reps`).prop('disabled', false);
        $(`#new-exercise-for-workout-${workoutID}-duration`).prop('disabled', true);
    });

    // Disable the weight, sets, and reps entries on the new exercise
    // form if the exercise type is cardio
    $('.new-exercise-type').on('input', (event) => {
        const target = $(event.target);
        const workoutID = target.attr('data-workout-id');

        if (target.val().toLowerCase() === 'cardio') {
            $(`#new-exercise-for-workout-${workoutID}-weight`).prop('disabled', true);
            $(`#new-exercise-for-workout-${workoutID}-sets`).prop('disabled', true);
            $(`#new-exercise-for-workout-${workoutID}-reps`).prop('disabled', true);
            $(`#new-exercise-for-workout-${workoutID}-duration`).prop('disabled', false);
        } else {
            $(`#new-exercise-for-workout-${workoutID}-duration`).val('');
            $(`#new-exercise-for-workout-${workoutID}-weight`).prop('disabled', false);
            $(`#new-exercise-for-workout-${workoutID}-sets`).prop('disabled', false);
            $(`#new-exercise-for-workout-${workoutID}-reps`).prop('disabled', false);
            $(`#new-exercise-for-workout-${workoutID}-duration`).prop('disabled', true);
        }
    });

    // Handle deleting an exercise
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

    // Handle deleting a workout plan
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