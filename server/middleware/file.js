

Upload = async (userId, uploadFile) => {

    const relativePath = '/public/files/' + uuidv4()+'.jpg';
    const uploadPath = __dirname + relativePath;   //uploadFile.name

    await uploadFile.mv(uploadPath).catch((err) => {
        throw Error(err);
    });
    return relativePath;
};
//데이터를 파일로 바꿔서 전송
dataURLtoFile = async (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}
const file = {
    Upload: Upload,
    dataURLtoFile : dataURLtoFile
};

module.exports = file;