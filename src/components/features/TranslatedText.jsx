import { useEffect, useState } from "react";
import { translateText } from "../../config/google-translate-config";
import { useSelector } from "react-redux";

const TranslatedText = ({ text, className = '' }) => {
    const { webLanguageData } = useSelector(state => state?.commonReducer);
    const [translated, setTranslated] = useState(text);

    useEffect(() => {
        const translate = async () => {
            const res = await translateText(text, webLanguageData);
            setTranslated(res);
        };
        translate();
    }, [text, webLanguageData]);

    return <p className={className}>{translated}</p>;
};

export default TranslatedText;