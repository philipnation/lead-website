"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Loader from "./Loader";


const Button = ({
  type,
  text,
  onBtnClick,
  iconName,
  imgPath,
  btnStyle,
  imgStyle,
  loading,
  btn_type,
}) => {
  return (
    <>
      {type == "outline" ? (
        <button
          //type={btn_type}
          className={`border-2 flex items-center justify-center p-2 font-[500] gap-1 border-black text-black text-[13px] rounded-lg ${btnStyle}`}
          onClick={onBtnClick}
          disabled={loading}
        >
          {loading === true ? (
            <Loader />
          ) : (
            <>
              {iconName ? (
                <span>{iconName}</span>
              ) : (
                <>
                  {imgPath && (
                    <Image
                      className={`${imgStyle}`}
                      width={24}
                      height={24}
                      src={imgPath}
                      alt=""
                    />
                  )}
                </>
              )}
              {text}
            </>
          )}
        </button>
      ) : (
        <button
          //type={btn_type}
          className={`flex items-center justify-center gap-1 p-2 font-[500] text-center text-[13px] rounded-lg ${btnStyle}`}
          onClick={onBtnClick}
          disabled={loading}
        >
          {loading === true ? (
            <Loader />
          ) : (
            <>
              {iconName ? (
                <iconName />
              ) : (
                <>
                  {imgPath && (
                    <Image src={imgPath} width={24} height={24} alt="" />
                  )}
                </>
              )}
              {text}
            </>
          )}
        </button>
      )}
    </>
  );
};

export default Button;
