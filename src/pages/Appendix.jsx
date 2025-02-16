import React from 'react';

const Appendix = () => {
  return (
    <div className="container mx-auto px-4 mt-[43px] py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Appendix</h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">Weights and Measures Used in Prescribing and Toxicology</h2>

        {/* Metric System */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">The Metric System</h3>
          <table className="w-full border-collapse border text-center border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Weight</th>
                <th className="border border-gray-300 p-2">Equivalent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">1 picogram (pg)</td>
                <td className="border border-gray-300 p-2">10⁻¹² gram</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">1000 picograms</td>
                <td className="border border-gray-300 p-2">1 nanogram (ng) or 10⁻⁹ gram</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">1000 nanograms</td>
                <td className="border border-gray-300 p-2">1 microgram (µg) or 10⁻⁶ gram</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">1000 micrograms</td>
                <td className="border border-gray-300 p-2">1 milligram (mg) or 10⁻³ gram</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">1000 milligrams</td>
                <td className="border border-gray-300 p-2">1 gram (g)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">1000 grams</td>
                <td className="border border-gray-300 p-2">1 kilogram (kg)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Volume */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Volume</h3>
          <table className="w-full border-collapse text-center border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Volume</th>
                <th className="border border-gray-300 p-2">Equivalent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">1000 milliliters (ml)</td>
                <td className="border border-gray-300 p-2">1 liter (L)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Apothecaries' System */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">The Apothecaries' System</h3>
          <table className="w-full border-collapse text-center border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Weight</th>
                <th className="border border-gray-300 p-2">Equivalent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">20 grains (gr)</td>
                <td className="border border-gray-300 p-2">1 scruple</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">3 scruples</td>
                <td className="border border-gray-300 p-2">1 dram = 60 grains</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">8 drams</td>
                <td className="border border-gray-300 p-2">1 ounce = 480 grains</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Conversion Equivalents */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Conversion Equivalents</h3>
          <table className="w-full border-collapse text-center border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">From</th>
                <th className="border border-gray-300 p-2">To</th>
                <th className="border border-gray-300 p-2">Approximate Equivalent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">1 milligram</td>
                <td className="border border-gray-300 p-2">Grains</td>
                <td className="border border-gray-300 p-2">1/60 grain</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">1 gram</td>
                <td className="border border-gray-300 p-2">Grains</td>
                <td className="border border-gray-300 p-2">15 grains</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">1 kilogram</td>
                <td className="border border-gray-300 p-2">Pounds</td>
                <td className="border border-gray-300 p-2">2.2 pounds</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">1 milliliter</td>
                <td className="border border-gray-300 p-2">Minims</td>
                <td className="border border-gray-300 p-2">15 minims</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Conversion Factors */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Conversion Factors for Obtaining Approximate Equivalents</h3>
          <table className="w-full border-collapse text-center border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">To Convert</th>
                <th className="border border-gray-300 p-2">To</th>
                <th className="border border-gray-300 p-2">Multiply by</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">gr/lb</td>
                <td className="border border-gray-300 p-2">mg/lb</td>
                <td className="border border-gray-300 p-2">60</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">mg/kg</td>
                <td className="border border-gray-300 p-2">mg/lb</td>
                <td className="border border-gray-300 p-2">0.45</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appendix;
