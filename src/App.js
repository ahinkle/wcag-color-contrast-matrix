import './App.css';
import React, { Component } from 'react'
import { scoreFromRatio, ratio } from 'wcag-color'
import clsx from 'clsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColors : [
        '#14532d',
        '#166534',
        '#15803d',
        '#16a34a',
        '#22c55e',
        '#4ade80',
        '#86efac',
        '#bbf7d0',
        '#dcfce7',
        '#f0fdf4',
      ],
      fgColors: [
        '#0f172a',
        '#1e293b',
        '#334155',
        '#475569',
        '#64748b',
        '#94a3b8',
        '#cbd5e1',
        '#e2e8f0',
        '#f3f4f6',
        '#f9fafb',
      ],
    }
  }

  determineBestTextColor = (bgColor) => {
    const bgColorScore = scoreFromRatio(ratio(bgColor, '#fff'));
    const fgColorScore = scoreFromRatio(ratio(bgColor, '#000'));
    return fgColorScore > bgColorScore ? '#fff' : '#000';
  }

  render() {
    return (
      <div className="bg-white">
        <div className="container py-10 mx-auto">
          <div className="py-10 lg:hidden">Warning: mobile isn't supported yet; please use a desktop browser.</div>

          {/* Background Color Header */}
          <div className="flex py-2 pl-28">
            <h2 className="uppercase">Background Color</h2>
            {/* <button type="button" className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Bg Color
            </button> */}
          </div>

          <div className="flex">
            {/* Foreground Color Header */}
            <div className="relative h-20 border-b border-r border-black w-28">
              <h2 className="absolute bottom-0 left-0 uppercase">Foreground Color</h2>
            </div>

            {/* Background Color List */}
            {this.state.bgColors.map((bgColor, index) => {
              return (
                <div className="relative h-20 border-b border-r border-black w-28" key={index}>
                  <div className="w-24 h-16 p-2 m-2" style={{ backgroundColor: bgColor }} >
                    <h2 className="text-sm uppercase" style={{ color: this.determineBestTextColor(bgColor) }}>{bgColor}</h2>
                  </div>
                </div>
              )
            })}
          </div>


          {/* Foreground Color List */}
          {this.state.fgColors.map((fgColor, index) => {
            return (
              <div className="flex" key={index}>
                <div className="relative h-20 border-b border-r border-black w-28">
                  <div className="w-24 h-16 p-2 m-2" style={{ backgroundColor: fgColor }} >
                    <p className="text-sm uppercase" style={{ color: this.determineBestTextColor(fgColor)}}>{fgColor}</p>
                  </div>
                </div>

                {/* Contrast Color */}
                {this.state.bgColors.map((bgColor, index) => {

                  const contrastRatio = ratio(fgColor, bgColor);

                  if (scoreFromRatio(contrastRatio) === 'Fail') {
                      return (
                        <div className="relative h-20 border-b border-r border-black w-28" key={index}>
                          <p className="absolute bottom-0 right-0 pb-1 pr-1 font-bold text-center text-red-500 uppercase">F</p>
                        </div>
                      )
                  } else {
                      return (
                        <div className="relative h-20 border-b border-r border-black w-28" key={index}>
                          <div className="w-24 h-16 p-2 m-2" style={{ backgroundColor: bgColor }} >
                            <p className="pt-3 text-sm font-semibold text-center uppercase" style={{ color: fgColor }}>{scoreFromRatio(contrastRatio)}</p>
                            <p className="text-center uppercase text-red-500 absolute bottom-0 right-0 pr-1 pb-1 text-xs mr-1 mb-0.5" style={{ color: fgColor }}>{contrastRatio}</p>
                          </div>
                        </div>
                      )
                  }
                })}
              </div>
            )
          })}

          <div className="flex">
            <div className="relative h-20 w-28">
              {/* <button type="button" className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Fg Color
              </button> */}
            </div>
          </div>

        </div>
      </div>
    );
  }
}




export default App;
