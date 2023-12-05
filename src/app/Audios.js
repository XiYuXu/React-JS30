import pianoKeys from "./PianoKes";

export default function Audios(){
    return  pianoKeys.map(element=>{
                const dataKey = element.key.charCodeAt();
                const audioName = element.description;
                return <audio data-key={dataKey} src={(`/sounds/${audioName}.wav`)}></audio>;
            }    
        );
}