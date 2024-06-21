'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/data');
      const data = await res.json();
      setData(data);
    }
    fetchData();
  }, []);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'code', header: 'Code' },
      { accessorKey: 'cat1', header: 'Cat1' },
      { accessorKey: 'cat2', header: 'Cat2' },
      { accessorKey: 'cat3', header: 'Cat3' },
      { accessorKey: 'cat4', header: 'Cat4' },
      { accessorKey: 'cat5', header: 'Cat5' },
      { accessorKey: 'noe', header: 'Noe' },
      { accessorKey: 'daraje', header: 'Daraje' },
      { accessorKey: 'soal', header: 'Soal' },
      { accessorKey: 'soalimg', header: 'SoalImg' },
      { accessorKey: 'pasokh', header: 'Pasokh' },
      { accessorKey: 'pasokhimg', header: 'PasokhImg' },
      { accessorKey: 'g1', header: 'G1' },
      { accessorKey: 'g1img', header: 'G1Img' },
      { accessorKey: 'g2', header: 'G2' },
      { accessorKey: 'g2img', header: 'G2Img' },
      { accessorKey: 'g3', header: 'G3' },
      { accessorKey: 'g3img', header: 'G3Img' },
      { accessorKey: 'g4', header: 'G4' },
      { accessorKey: 'g4img', header: 'G4Img' },
      { accessorKey: 'sahih', header: 'Sahih' },
      { accessorKey: 'added', header: 'Added' },
      { accessorKey: 'edited', header: 'Edited' },
      { accessorKey: 'mainimg', header: 'MainImg' },
      { accessorKey: 'daste', header: 'Daste' },
      { accessorKey: 'soalaks', header: 'SoalAks' },
      { accessorKey: 'maghta', header: 'Maghta' },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
        <input
          value={table.getState().globalFilter ?? ''}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
        />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </button>
        </div>
    </div>
  );
}
