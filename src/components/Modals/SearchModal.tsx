import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default async function openModal(type: string) {
    if (type === 'search') {
    Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
}