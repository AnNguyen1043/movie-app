import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function MoviePagination({ page, totalPages, onPaginationChange }) {
  return (
    <Stack spacing={2}>
      <Pagination page={page} count={totalPages} onChange={onPaginationChange} color="primary" />
    </Stack>
  );
}