
function setImageIndex(imageIdentificator, imagePaths, currentIndex) {
    var imageElement = document.getElementById(imageIdentificator);
    imageElement.src = imagePaths[currentIndex];
}

function executeImageChanger(imageIdentificator, imagePaths, currentIndex, timeout) {
    setImageIndex(imageIdentificator, imagePaths, currentIndex);

    var nextIndex = (currentIndex + 1) % imagePaths.length;
    setTimeout(() => {
        executeImageChanger(imageIdentificator,
            imagePaths,
            nextIndex,
            timeout);
    }, timeout);
}

function slideImage(imageInformation, moveIndex) {
    var nextIndex = imageInformation.index + moveIndex;
    imageInformation.index = nextIndex < 0 ? imageInformation.images.length + moveIndex : nextIndex % (imageInformation.images.length);
    setImageIndex(imageInformation.name, imageInformation.images, imageInformation.index);
} 