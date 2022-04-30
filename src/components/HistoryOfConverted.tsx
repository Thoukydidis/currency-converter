import React from "react";
import "./HistoryOfConverted.css";
import CloseIcon from "@mui/icons-material/Close";
import ConvertedValue from "./ConvertedValue";
import { IconButton } from "@mui/material";
import { HistoryLabel } from "../utils/interfaces";
import _ from "lodash";

interface Props {
  history: HistoryLabel[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryLabel[] | []>>;
}

const HistoryOfConverted = (props: Props) => {
  const { history, setHistory } = props;
  const historyTitle: string = "Previous amounts";
  const clearHistory: string = "CLEAR ALL";

  const renderHistory = () => {
    return history.map((historyItem) => {
      return (
        <ConvertedValue
          currencyFrom={historyItem.currencyFrom}
          currencyTo={historyItem.currencyTo}
          convertedValue={historyItem.convertedAmount}
          isHistory={true}
        >
          <IconButton onClick={() => setHistory([])}>
            <CloseIcon />
          </IconButton>
        </ConvertedValue>
      );
    });
  };

  if (!_.isEmpty(history)) {
    return (
      <>
        <div className="historyContainer">
          <span className="historyTitle">{historyTitle}</span>
          <span onClick={() => setHistory([])} className="clearAll">
            {clearHistory}
          </span>
        </div>
        {renderHistory()}
      </>
    );
  } else return null;
};

export default HistoryOfConverted;
