import { useState } from "react";

export const QrCode = () => {
    const [img,setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setqrData] = useState("")
    const [qrSize, setqrSize] = useState("")
    
async function generateQr(){
    setLoading(true);
    try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
        setImg(url);
    }
    catch(error){
        console.error("error while generating",error);
    }
    finally{
        setLoading(false);
    }
}
function downloadQr(){
    fetch(img).then((response)=>response.blob()).then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch((error)=>{
        console.error("error while downloading",error);
    });
}

  return (
    <div className="app-container">
        <h1>QR code generator</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} alt="" className="img"/>}
        <div>
            <label htmlFor="dataInput" className="input-label">Data for QR code:</label>
            <input type="text" value={qrData} id="dataInput" placeholder="data for QR code" onChange={(e)=>setqrData(e.target.value)}/>
            <label htmlFor="sizeInput" className="input-label">Image size (e.g., 150)</label>
            <input type="text" value={qrSize} id="dataInput" placeholder="Enter image size" onChange={(e)=>setqrSize(e.target.value)}/>
            <button className="generate-button" disabled={loading} onClick={generateQr}>Generate QR code</button>
            <button className="download-button" onClick={downloadQr}>Download QR code</button>
        </div>
        <p className="footer">Designed By <a href="https://github.com/NaveenSMB">Naveen S M B</a></p>
    </div>
  )
}
