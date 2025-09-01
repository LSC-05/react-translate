import { useContext } from 'react';
import { Box, Stack, Paper, Button } from '@mui/material';
import { Container, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { DispatchContext } from './../providers/DispatchContext';
import { Star } from './Star';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const TextList = ({ data }) => {
  const dispatch = useContext(DispatchContext);

  const handleClickDelete=(e, id)=>{
    dispatch({
      type: "delete",
      payload: {
        id
      }
    })
  }

  const handleClickStar=(e, id)=> {
    dispatch({
      type: "star",
      payload: {
        id
      }
    })
  }
  return (
    <Container sx={{ mt: 2, mb: 10 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="table">
          <TableHead>
            <TableRow>
              <StyledTableCell>翻訳前テキスト</StyledTableCell>
              <StyledTableCell>翻訳後テキスト</StyledTableCell>
              <StyledTableCell>削除</StyledTableCell>
              <StyledTableCell>スター</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id} hover sx={{ cursor: 'pointer' }}>
                <StyledTableCell>{d.fromText}{` (${d.fromLang})`}</StyledTableCell>
                <StyledTableCell>{d.toText}{` (${d.toLang})`}</StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="delete" color="error" onClick={(e)=> handleClickDelete(e, d.id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="star" onClick={(e)=> handleClickStar(e, d.id)}>
                    <Star {...d} />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
