import React from 'react';
import notFound from '../components/design/clip-1386.png'

export default () => {
    const styles_one = {
        borderTopWidth: "0px",
        borderTopStyle: "solid",
        borderBottomWidth: "0px",
        borderBottomStyle: "solid",
        display: "flex", 
        fontFamily: "Dubai",
        fontSize: "13px", 
        lineHeight: "22px",
        letterSpacing: ".01em",
        wordWrap: "break-word"
    }
    const style_two = {
        flexDirection: "column",
        justifyContent: "center",
        width: "44%",
        marginRight: "18px",
        display: "flex"
    }

    return (
        <div className = "container">
            <div style={styles_one}>
                <div className="text" style={style_two}>
                    <div class="title" style={{fontSize: "30px", lineHeight: "31px", fontWeight: 600}}>Please Acquire Permission from Administrator</div>
                    <div class="subtitle" style={{color: "#777", fontSize: "21px", lineHeight: "22px", marginTop: "10px"}}>You don't have access to this page or it doesn't Exist</div>
                    <div class="get-started" style={{background: "#1d1d1d",
                                                    borderRadius: "4px",
                                                    height: "34px",
                                                    color: "#fff",
                                                    fontSize: "12px",
                                                    lineHeight: "34px",
                                                    marginTop: "16px",
                                                    // width: "-webkit-fit-content",
                                                    width: "-moz-fit-content",
                                                    // width: "fit-content",
                                                    padding: "0 15px",
                                                    textAlign: "center"}}>
                        Go Home
                    </div>
                </div>
                {/* <h1 style={{padding: "50px"}}>404 Not Found</h1> */}
                <div class="image" style={{backgroundImage: `url(${notFound})`, 
                                            pointerEvents: "none",
                                            width: "500px",
                                            height: "500px",
                                            backgroundOrigin: "content-box",
                                            backgroundSize: "contain", 
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "50%"}}>
                </div>
            </div>
        </div>
    )
}