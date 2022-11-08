import List, { ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from '@mui/material/styles'

import { Supplier } from '@/types'

interface SupplierListProps extends ListProps {
  suppliers: Supplier[]
  onDelete: (supplier: Supplier) => void
}

export default (props: SupplierListProps) => {
  const { suppliers, ...restProps } = props
  const theme = useTheme()
  return (
    <List
      sx={{
        flexBasis: theme.spacing(32),
        minWidth: theme.spacing(30),
        bgcolor: 'grey.100',
      }}
      dense={true}
      {...restProps}
    >
      {suppliers.map((supplier: Supplier) => (
        <>
          <ListItem
            key={supplier._id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={supplier.name} />
          </ListItem>
          <Divider />
        </>
      ))}
      <ListItem>
        <ListItemButton>
          <AddIcon color="primary" fontSize="large" />
          <ListItemText primary="Zulieferer Hinzufüguen" />
        </ListItemButton>
      </ListItem>
    </List>
  )
}
