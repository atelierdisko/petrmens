import React, {useState} from "react";
import LazyLoad from "react-lazyload";

const Image = ({
                   src,
                   alt,
                   className,
                   progressiveLoading = true,
                   placeholderWidth = 20,
                   manipulations = {},
                   background = false,
                   children,
                   ...rest
               }) => {

    const parameters = new URLSearchParams();

    Object.keys(manipulations).map((manipulation) => {
        parameters.append(manipulation, manipulations[manipulation]);
    });

    const [source, setSource] = useState(
        progressiveLoading
            ? `${src}?w=${placeholderWidth}`
            : `${src}?${parameters.toString()}`
    );

    const [loading, setLoading] = useState(true);

    const backgroundStyles = {
        transition: "opacity .15s linear",
        backgroundImage: `url(${source})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        width: `100%`,
        height: `100%`,
    }

    if (!progressiveLoading) {
        if (!background) {
            return (
                <div className={className} style={{
                    width: `100%`,
                }}>
                    <img src={source} alt={alt} {...rest} />
                </div>
            );
        }

        return (
            <div className={className}>
                <div style={{
                    ...backgroundStyles
                }}>
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <LazyLoad height={100}>
                {background ? (
                    <div style={{
                        opacity: loading ? 0.5 : 1,
                        ...backgroundStyles
                    }}
                    >
                        <img
                            onLoad={() => {
                                setLoading(false);
                                setSource(`${src}?${parameters.toString()}`);
                            }}
                            src={source}
                            alt={`${alt} placeholder`}
                            style={{display: "none"}}
                        />
                    </div>
                ) : (
                    <img
                        onLoad={() => {
                            setLoading(false);
                            setSource(`${src}?${parameters.toString()}`);
                        }}
                        src={source}
                        style={{
                            opacity: loading ? 0.5 : 1,
                            transition: "opacity .15s linear",
                            width: "100%",
                        }}
                        alt={alt}
                        {...rest}
                    />
                )}

                {children}
            </LazyLoad>
        </div>
    )
}

export default Image
