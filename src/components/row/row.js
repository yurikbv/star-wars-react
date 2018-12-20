import React from "react";

const Row = ({left, right}) => {
  return (
    <main className="row mb2 section-padd">
      <section className="col-md-6">
        {left}
      </section>
      <section className="col-md-6">
        {right}
      </section>
    </main>
  )
};


export default Row;