"use client"

import { useRef } from 'react';
import { useInvoiceProvider } from "@/components/provider/invoice-provider";
import { ToWords } from 'to-words';
import { formatCurrencyForIndia } from "@/lib/utils";
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns'

export default function OGTempalate() {
    const { invoiceTemplate } = useInvoiceProvider();

    const toWords = new ToWords();

    const unfilledArray = Array.from({ length: 18 - invoiceTemplate.pricedProductIds?.length }, (_, i) => i + 1);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const printDocument = () => {
        const input = document.getElementById("divToPrint");
        html2canvas(input)?.then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 3, 3, canvas.width * 0.155, canvas.height * 0.155);
            pdf.save(`Invoice.pdf`);
            pdf.autoPrint();
        });
    };

    const totalCgstAmt = invoiceTemplate?.pricedProductIds?.reduce((sum, product) => sum + product.cgstAmt, 0)
    const totalSgstAmt = invoiceTemplate?.pricedProductIds?.reduce((sum, product) => sum + product.sgstAmt, 0)

    return (
        <div className='max-w-screen-md container mx-auto'>
            <div className="flex justify-center mb-2">
                <button onClick={handlePrint} className="bg-customColor-100 text-customColor-50 rounded-md p-2">Print Invoice</button>
                <button onClick={printDocument} className="bg-customColor-100 text-customColor-50 rounded-md p-2 ml-2">Download PDF</button>
            </div>
            <div ref={componentRef} id="divToPrint" className='text-sm '>
                <header className='pt-5'>
                    <div className=" flex justify-between mb-1">
                        <div></div>
                        <div className="font-bold text-center ml-56 text-lg">Tax Invoice</div>
                        <div className="italic mr-28">(ORIGINAL FOR RECIPIENT)</div>
                    </div>
                </header>

                <main>
                    <div className="border border-black mx-12 font-semibold">
                        <div className="flex">
                            <div className="w-[52%]">
                                <div className="border-r border-black px-1">
                                    <p className="font-bold">MUKESH TRADERS</p>
                                    <p>House No. 238, Ground Floor</p>
                                    <p>RANGPURI NEW DELHI</p>
                                    <p>GSTIN/UIN : 514781548</p>
                                    <p>State Name : Delhi, Code : 07</p>
                                </div>
                                <div className="border-t border-r border-black px-1">
                                    <p>Buyer (Bill to)</p>
                                    <p className="font-bold">{invoiceTemplate?.customerId?.customerName}</p>
                                    <p>{invoiceTemplate?.customerId?.address}</p>
                                    <p>GSTIN/UIN : {invoiceTemplate?.customerId?.gstin}</p>
                                    <p>State Name : {invoiceTemplate?.customerId?.state}, Code : {invoiceTemplate?.customerId?.stateCode}</p>
                                </div>
                            </div>
                            <div className="w-[48%]">
                                <div className="grid grid-cols-2">
                                    <span className="border-b border-r border-black px-1 h-10">
                                        <p>Invoice No.</p>
                                        <p className="font-bold">{invoiceTemplate?.id}</p>
                                    </span>
                                    <span className="border-b border-black px-1 h-10">
                                        <p>Dated</p>
                                        <p className="font-bold">
                                            {format(invoiceTemplate?.invoicedate, 'dd-MM-yyyy')}
                                        </p>
                                    </span>
                                    <span className="border-b border-r border-black px-1 h-10">
                                        <p>Delivery Note</p>
                                    </span>
                                    <span className="border-b border-black px-1 h-10">
                                        <p>Mode/Terms of Payment</p>
                                    </span>
                                    <span className="border-b border-r border-black px-1 h-10">
                                        <p>Reference No. & Date</p>
                                    </span>
                                    <span className="border-b border-black px-1 h-10">
                                        <p>Other References</p>
                                    </span>
                                </div>
                                <div className="px-1">
                                    <p>Terms of Delivery</p>
                                </div>
                            </div>

                        </div>

                        <div className="relative -z-10 h-[29rem] w-full text-center border-y border-black">
                            <div className="flex border-b border-black items-center text-center">
                                <div className="border-r border-black w-10 ">SNo.</div>
                                <div className="border-r border-black w-[322px] ">Description of Goods</div>
                                <div className="border-r border-black w-20 ">HSN/SAC</div>
                                <div className="border-r border-black w-20 ">Quantity</div>
                                <div className="border-r border-black w-20 ">Rate</div>
                                <div className=" w-20 ">Amount</div>
                            </div>

                            <div>
                                {invoiceTemplate?.pricedProductIds?.map((item, i) => (
                                    <div key={item.id} className="flex w-full  text-center">
                                        <div className="border-r border-black w-10">{i + 1}</div>
                                        <div className="border-r border-black w-[322px] text-start px-1">{item?.productId?.productName}</div>
                                        <div className="border-r border-black w-20">{item?.productId?.hsnCode}</div>
                                        <div className="border-r border-black w-20">{item?.qty}</div>
                                        <div className="border-r border-black w-20">{item?.rate}</div>
                                        <div className='w-20'>{item?.taxableValue}</div>
                                    </div>
                                ))}
                            </div>

                            <UnfilledProductTable />
                            <UnfilledProductTable />
                            <UnfilledProductTable />

                            {/* <div className=" w-full flex border-black items-center text-center">
                                <div className="border-r border-black w-10 ">&nbsp;</div>
                                <div className="border-r border-black w-[322px] text-end px-1 italic">CGST %</div>
                                <div className="border-r border-black w-20 ">&nbsp;</div>
                                <div className="border-r border-black w-20 ">&nbsp;</div>
                                <div className="border-r border-black w-20 ">&nbsp;</div>
                                <div className=" w-20 ">{totalCgstAmt}</div>
                            </div>
                            <div className=" w-full flex border-black items-center text-center">
                                <div className="border-r border-black w-10 ">&nbsp;</div>
                                <div className="border-r border-black w-[322px] text-end px-1 italic">SGST %</div>
                                <div className="border-r border-black w-20 ">&nbsp;</div>
                                <div className="border-r border-black w-20 ">&nbsp;</div>
                                <div className="border-r border-black w-20 ">&nbsp;</div>
                                <div className=" w-20 ">{totalSgstAmt}</div>
                            </div> */}
                            <div className=" w-full flex border-black items-center text-center">
                                <div className="border-r border-black w-10 ">&nbsp;</div>
                                <div className="border-r border-black w-[322px] text-end px-1 italic">IGST %</div>
                                <div className="border-r border-black w-20 ">&nbsp;</div>
                                <div className="border-r border-black w-20 ">&nbsp;</div>
                                <div className="border-r border-black w-20 ">&nbsp;</div>
                                <div className=" w-20 ">{totalSgstAmt}</div>
                            </div>

                            <div className=" absolute bottom-0 w-full flex border-t border-black items-center text-center">
                                <div className="border-r border-black w-10 ">&nbsp;</div>
                                <div className="border-r border-black w-[322px] text-end px-1">Total</div>
                                <div className="border-r border-black w-20 "></div>
                                <div className="border-r border-black w-20 "></div>
                                <div className="border-r border-black w-20 "></div>
                                <div className=" w-20">{formatCurrencyForIndia(invoiceTemplate?.totalInvoiceValue)}</div>
                            </div>

                            {
                                unfilledArray.map(item => <UnfilledProductTable key={item} />)
                            }

                        </div>

                        <div className="border-b border-black flex justify-between px-1">
                            <div>
                                <p>Amount Chargeable (in words)</p>
                                <p className="font-bold">INR {toWords.convert((invoiceTemplate?.totalTaxableValue), { currency: true })}</p>
                            </div>
                            <div className="italic">E. & O.E</div>
                        </div>

                        <div className="flex text-center">

                            {/* Header 1 */}
                            <div className="border-b w-80 border-r border-black ">
                                <div>HSN/SAC</div>
                            </div>

                            {/* Header 2 */}
                            <div className="flex border-b border-black text-center">

                                <div className="w-20 border-r px-2 border-black">
                                    <div>Taxable Value</div>
                                </div>

                                <div>
                                    <div className="border-b border-r border-black">
                                        Central Tax
                                    </div>
                                    <div className="flex">
                                        <div className="w-10 border-r border-black">Rate</div>
                                        <div className="w-16 border-r border-black">Amount</div>
                                    </div>

                                </div>
                                <div className="">
                                    <div className="border-b border-r border-black">
                                        State Tax
                                    </div>
                                    <div className="flex">
                                        <div className="w-10 border-r border-black">Rate</div>
                                        <div className="w-16 border-r border-black">Amount</div>
                                    </div>

                                </div>
                                <div className="w-[93px] border-black">
                                    Total Tax Amount
                                </div>

                            </div>
                        </div>
                        <div className='w-full'>
                            {invoiceTemplate?.pricedProductIds?.map((item) => (
                                <div key={item.id} className='flex'>

                                    <div className="w-80">
                                        <div className="border-b border-r border-black text-start px-1">{item?.productId?.hsnCode}</div>
                                    </div>

                                    <div className="flex text-center">

                                        <div className="w-20 border-b border-r border-black">{item?.taxableValue}</div>

                                        <div className="flex">
                                            <div className="w-10 border-b border-r border-black">{item?.productId?.cgstRate}%</div>
                                            <div className="w-16 border-b border-r border-black">{item?.cgstAmt}</div>
                                        </div>

                                        <div className="flex">
                                            <div className="w-10 border-b border-r border-black">{item?.productId?.sgstRate}%</div>
                                            <div className="w-16 border-b border-r border-black">{item?.sgstAmt}</div>
                                        </div>

                                        <div className="w-[93px] border-b border-black">{item?.sgstAmt + item?.cgstAmt}</div>

                                    </div>
                                </div>

                            ))}

                            <div className='flex'>
                                <div className="w-80">
                                    <div className="border-b border-r border-black text-right px-1">Total</div>
                                </div>

                                <div className="flex text-center">
                                    <div className="w-20 border-b border-r border-black">{invoiceTemplate?.totalTaxableValue}</div>

                                    <div className="flex">
                                        <div className="w-10 border-b border-r border-black"></div>
                                        <div className="w-16 border-b border-r border-black">{totalCgstAmt}</div>
                                    </div>

                                    <div className="flex">
                                        <div className="w-10 border-b border-r border-black"></div>
                                        <div className="w-16 border-b border-r border-black">{totalSgstAmt}</div>
                                    </div>

                                    <div className="w-[93px] border-b border-black">{invoiceTemplate?.totalTaxGST}</div>
                                </div>
                            </div>

                        </div>

                        <div>
                            <span className='px-1'>Tax Amount (in words) : <span className="font-bold">INR {toWords.convert(invoiceTemplate?.totalTaxGST, { currency: true })}</span></span>
                            <div className="flex w-full">
                                <div className='w-96'>&nbsp;</div>
                                <div className='w-full'>
                                    <p>Company&apos;s Bank Details</p>
                                    <table >
                                        <thead>
                                            <tr>
                                                <td>Bank Name</td>
                                                <td className="font-bold">: BANK OF BARODA</td>
                                            </tr>
                                            <tr>
                                                <td>A/c No.</td>
                                                <td className="font-bold">: 769302000000450</td>
                                            </tr>
                                            <tr>
                                                <td>Branch & IFS Code</td>
                                                <td className="font-bold">: MAHIPALPUR NEW DELHI & BARBOVJMAHP</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                            <div className='w-full flex'>
                                <div className='px-1 w-2/4'>
                                    <p>Declaration :</p>
                                    We declare that this invoice shows the actual price of the goods described and that all the particulars are true & correct.
                                </div>
                                <div className="border-t border-l border-black flex flex-col justify-between px-1 w-2/4">
                                    <div className="text-end font-bold">for MUKESH TRADERS</div>
                                    <div className="text-end">Authorised Signatory</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <p className="text-center">This is a Computer Generated Invoice</p>
                </footer>
            </div>
        </div>
    )
}

const UnfilledProductTable = () => {
    return (
        <div className="flex items-center text-center">
            <div className="border-r border-black w-10 ">&nbsp;</div>
            <div className="border-r border-black w-[322px] ">&nbsp;</div>
            <div className="border-r border-black w-20 ">&nbsp;</div>
            <div className="border-r border-black w-20 ">&nbsp;</div>
            <div className="border-r border-black w-20 ">&nbsp;</div>
            <div className=" w-20 "></div>
        </div>
    )
}