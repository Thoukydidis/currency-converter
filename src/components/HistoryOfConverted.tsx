import React, { useEffect, useState } from "react";
import "./HistoryOfConverted.css";
import CloseIcon from "@mui/icons-material/Close";
import ConvertedValue from "./ConvertedValue";
import { IconButton } from "@mui/material";
import { HistoryLabel } from "../utils/interfaces";
import _ from "lodash";
import Pagination from "@mui/material/Pagination";

interface Props {
  history: HistoryLabel[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryLabel[] | []>>;
}

const HistoryOfConverted = (props: Props) => {
  const { history, setHistory } = props;
  const historyTitle: string = "Previous amounts";
  const clearHistory: string = "CLEAR ALL";
  const numberPerPage: number = 3;

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<Array<Array<HistoryLabel>>>(
    []
  );

  useEffect(() => {
    const newCount = Math.ceil(history.length / numberPerPage);
    setCount(newCount);
    if (history.length > 3) {
      const historyItems: HistoryLabel[] = [...history];
      const i = chunk(historyItems, numberPerPage);
      i && setItemsPerPage(i);
    } else setItemsPerPage([history]);
  }, [history]);

  const chunk = (items: HistoryLabel[], size: number) => {
    let chunks = [];

    while (items.length) {
      chunks.push(items.splice(0, size));
    }
    return chunks;
  };

  const removeFromHistory = (id: string) => {
    const updatedHistory: HistoryLabel[] = history.filter(
      (item) => item.id !== id
    );
    setHistory(updatedHistory);
  };

  const renderHistory = () => {
    return (
      itemsPerPage[page - 1] &&
      itemsPerPage[page - 1].map((historyItem) => {
        return (
          <ConvertedValue
            key={historyItem.id}
            currencyFrom={historyItem.currencyFrom}
            currencyTo={historyItem.currencyTo}
            convertedValue={historyItem.convertedAmount}
            isHistory={true}
          >
            <IconButton onClick={() => removeFromHistory(historyItem.id)}>
              <CloseIcon />
            </IconButton>
          </ConvertedValue>
        );
      })
    );
  };

  const handleChange = (page: number) => {
    setPage(page);
  };

  if (!_.isEmpty(history)) {
    return (
      <>
        <div className="historyContainer">
          <div className="historyLabel">
            <span className="historyTitle">{historyTitle}</span>
            <span onClick={() => setHistory([])} className="clearAll">
              {clearHistory}
            </span>
          </div>
          {renderHistory()}
        </div>
        <Pagination
          className="paginationWrapper"
          count={count}
          page={page}
          size="small"
          onChange={(e, page: number) => {
            handleChange(page);
          }}
        />
      </>
    );
  } else return null;
};

export default HistoryOfConverted;
