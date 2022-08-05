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

  deleteForegroundColor = (index) => {
    const { fgColors } = this.state;
    fgColors.splice(index, 1);
    this.setState({ fgColors });
  }

  deleteBackgroundColor = (index) => {
    const { bgColors } = this.state;
    bgColors.splice(index, 1);
    this.setState({ bgColors });
  }

  randomizeColors = () => {
    const numberOfColors = 10;
    const bgColors = [];
    const fgColors = [];
    for (let i = 0; i < numberOfColors; i++) {
      bgColors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
      fgColors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    this.setState({ bgColors, fgColors });
  }

  randomForegroundColor = () => {
    const { fgColors } = this.state;
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    fgColors.push('#' + randomColor);
    this.setState({ fgColors });
  }

  clear = () => {
    this.setState({
      bgColors: [],
      fgColors: [],
    });
  }

  render() {
    return (
      <div className="bg-white">
        <div className="container pt-10 mx-auto">
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
                <div className="relative h-20 border-b border-r border-black w-28 group" key={index}>
                  <div className="relative w-24 h-16 p-2 m-2" style={{ backgroundColor: bgColor }} >
                    <span
                      className="absolute top-0 right-0 px-2 py-1 -mt-1.5 -mr-1.5 text-sm text-white uppercase bg-red-500 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => this.deleteBackgroundColor(index)}
                    >
                      x
                    </span>
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
                <div className="relative h-20 border-b border-r border-black w-28 group">
                  <div className="relative w-24 h-16 p-2 m-2" style={{ backgroundColor: fgColor }} >
                    <span
                      className="absolute top-0 right-0 px-2 py-1 -mt-1.5 -mr-1.5 text-sm text-white uppercase bg-red-500 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => this.deleteForegroundColor(index)}
                    >
                      x
                    </span>
                    <p className="text-sm uppercase" style={{ color: this.determineBestTextColor(fgColor)}}>{fgColor}</p>
                  </div>
                </div>

                {/* Contrast Color */}
                {this.state.bgColors.map((bgColor, index) => {

                  const contrastRatio = ratio(fgColor, bgColor);

                  if (scoreFromRatio(contrastRatio) === 'Fail') {
                      return (
                        <div className="group">
                            <div className="relative h-20 border-b border-r border-black group-hover:border-red-500 group-hover:border-4 w-28" key={index}>
                            <p className="absolute bottom-0 right-0 pb-1 pr-1 font-bold text-center text-red-500 uppercase">F</p>
                            <p className="text-center uppercase text-red-500 absolute bottom-0 left-0 pl-1 pb-1 text-xs mr-1 mb-0.5 hidden group-hover:block">{contrastRatio}</p>
                            </div>
                        </div>
                      )
                  } else {
                      return (
                        <div className="relative h-20 border-b border-r border-black w-28 group" key={index}>
                          <div className="w-24 h-16 p-2 m-2" style={{ backgroundColor: bgColor }} >
                            <p className="pt-3 text-sm font-semibold text-center uppercase" style={{ color: fgColor }}>{scoreFromRatio(contrastRatio)}</p>
                            <p className="text-center uppercase text-red-500 absolute bottom-0 right-0 pr-2 pb-1.5 text-xs mr-1 mb-0.5 hidden group-hover:block" style={{ color: fgColor }}>{contrastRatio}</p>
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

        <div className="container mx-auto">
          <button
            type="button"
            className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={this.clear}
          >
              Clear All
          </button>

          <button
            type="button"
            className="ml-5 mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={this.randomizeColors}
          >
            Randomize
          </button>
        </div>
      </div>
    );
  }
}




export default App;
