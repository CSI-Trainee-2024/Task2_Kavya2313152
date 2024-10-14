let exercises = [];
let currentExerciseIndex = 0;
let countdownInterval;

document.getElementById("addExercise").addEventListener("click", () => {
    const exerciseName = document.getElementById("exerciseName").value.trim();
    const timeDuration = parseInt(document.getElementById("timeDuration").value.trim());

    if (exerciseName && !isNaN(timeDuration) && timeDuration > 0) {
        exercises.push({ name: exerciseName, duration: timeDuration });
        updateExerciseList();
        document.getElementById("exerciseName").value = '';
        document.getElementById("timeDuration").value = '';
    }
});

function updateExerciseList() {
    const exerciseList = document.getElementById("exerciseList");
    exerciseList.innerHTML = '';
    exercises.forEach((exercise, index) => {
        const li = document.createElement("li");
        li.innerText = `${exercise.name} - ${exercise.duration} seconds`;
        const skipButton = document.createElement("button");
        skipButton.innerText = "Skip";
        skipButton.addEventListener("click", () => skipExercise(index));
        li.appendChild(skipButton);
        exerciseList.appendChild(li);
    });
    document.getElementById("startExercises").style.display = exercises.length > 0 ? "block" : "none";
}

document.getElementById("startExercises").addEventListener("click", startExercises);
document.getElementById("endTask").addEventListener("click", endTaskEarly);

function startExercises() {
    if (currentExerciseIndex < exercises.length) {
        const exercise = exercises[currentExerciseIndex];
        document.getElementById("summary").innerHTML = `Current Exercise: ${exercise.name}`;
        document.getElementById("summary").style.display = "block";
        startTimer(exercise.duration);
    } 
    else {
        completeExercises();
    }
}

function startTimer(duration) {
    let timeLeft = duration;
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.style.fontSize = '20px';
    document.getElementById("summary").appendChild(timerDisplay);

    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("timer").remove(); 
            currentExerciseIndex++;
            startExercises(); 
        } else {
            timerDisplay.innerText = `Time Left: ${timeLeft--} seconds`;
        }
    }, 1000);
}

function skipExercise(index) {
    currentExerciseIndex = index + 1;
    clearInterval(countdownInterval);
    document.getElementById("timer").remove(); 
    startExercises(); 
}

function completeExercises() {
    clearInterval(countdownInterval);
    const totalTime = exercises.reduce((sum, exercise) => sum + exercise.duration, 0);
    document.getElementById("summary").innerHTML = `All exercises completed! Total time: ${totalTime} seconds.`;
}

function endTaskEarly() {
    clearInterval(countdownInterval);
    completeExercises();
}






