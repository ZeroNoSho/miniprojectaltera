"use client";
import { Contex } from "@/context/store";
import Chart from "chart.js";
import { useEffect, useContext, useState } from "react";

export default function CardLineChart() {
  const [color, setColor] = useState([
    "#354694",
    "#359484",
    "#947c35",
    "#943535",
  ]);
  const { real } = useContext(Contex);

  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "Oktober",
          "November",
          "Desember",
        ],
        datasets: real?.groupedDatas.map((e, i) => {
          return {
            label: e.nama,
            fill: false,
            backgroundColor: color[i],
            borderColor: color[i],
            data: [
              e.data[0]?.jumlah || 0,
              e.data[1]?.jumlah || 0,
              e.data[2]?.jumlah || 0,
              e.data[3]?.jumlah || 0,
              e.data[4]?.jumlah || 0,
              e.data[5]?.jumlah || 0,
              e.data[6]?.jumlah || 0,
              e.data[7]?.jumlah || 0,
              e.data[8]?.jumlah || 0,
              e.data[9]?.jumlah || 0,
              e.data[10]?.jumlah || 0,
              e.data[11]?.jumlah || 0,
            ],
          };
        }),
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "Black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#485fc7",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "#485fc7a0",
                zeroLineColor: "#485fc7a0",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "#485fc7",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "#485fc7",
                zeroLineColor: "#485fc7",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [real]);

  return (
    <>
      <div className="z-0 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700 max-h-full min-h-screen">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <p className="text-3xl font-semibold pb-10 text-center text_blue">
                Produksi Real
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-96">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
