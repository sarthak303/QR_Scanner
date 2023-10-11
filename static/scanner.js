document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("return-btn").addEventListener("click", function () {
        window.location.href = "/";
    });

    const video = document.getElementById("video");

    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "user" } }) 
        .then(function (stream) {
            video.srcObject = stream;
            return video.play(); 
        })
        .catch(function (error) {
            console.log("Error accessing the webcam: " + error.message);
        });

    video.onplaying = function () {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");

        const scanBarcode = () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                alert("Detected QR/Barcode: " + code.data);
            }

            requestAnimationFrame(scanBarcode);
        };

        scanBarcode();
    };
});
