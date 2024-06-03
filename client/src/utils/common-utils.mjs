

export const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

export const downloadMedia = (e, originalImage) => {
    e.preventDefault();

    try {
        fetch(originalImage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        })
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = "none";
            a.href = url;

            const nameSplit = originalImage.split("/");
            const duplicateName = decodeURIComponent(nameSplit.pop());

            a.download = "" + duplicateName + "";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }).catch(error => console.log('Error while downloading the image', error.message));
    } catch (error) {
        console.log('Error while downloading the image', error.message);
    }
}



//CODE WITHOUT LOCALHOST 28/05.24:
// export const formatDate = (date) => {
//     const hours = new Date(date).getHours();
//     const minutes = new Date(date).getMinutes();
//     return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
// };

// export const isMedia = (messageText) => {
//     if (typeof messageText !== 'string') {
//         return false;
//     }
//     const mediaIndicators = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.pdf', '.txt', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar', '.mp3', '.ogg', '.wav', '.avi'];
//     return mediaIndicators.some(extension => messageText.toLowerCase().includes(extension));
// };

// export const downloadMedia = (e, originalImage) => {
//     e.preventDefault();

//     try {
//         fetch(originalImage)
//         .then(resp => resp.blob())
//         .then(blob => {
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.style.display = "none";
//             a.href = url;

//             const nameSplit = originalImage.split("/");
//             const duplicateName = nameSplit.pop();

//             a.download = duplicateName;
//             document.body.appendChild(a);
//             a.click();
//             window.URL.revokeObjectURL(url);
//         }).catch(error => console.log('Error while downloading the image', error.message));
//     } catch (error) {
//         console.log('Error while downloading the image', error.message);
//     }
// };