import {
  faCircleExclamation,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./button";

const ErrorAlert = ({ message, close }) => {
  const { t } = useTranslation();

  // disable scro
  document.body.style.overflow = "hidden";
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-sm">
      <div className="bg-white rounded w-[25rem] h-[60vh] overflow-hidden">
        <div className="bg-red-500 h-2/3 flex items-center justify-center">
          <FontAwesomeIcon
            color="white"
            size={"10x"}
            icon={faCircleExclamation}
            onClick={() => {
              close();
              document.body.style.overflow = "auto";
            }}
          />
        </div>
        <h1 className="text-center text-2xl font-bold">{t("Error")}</h1>
        <div className="h-[7vh] px-5 py-3 text-center font-light">
          {t(message)}
        </div>
        <div className="w-full flex justify-center">
          <Button
            onClick={() => {
              close();
              document.body.style.overflow = "auto";
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
