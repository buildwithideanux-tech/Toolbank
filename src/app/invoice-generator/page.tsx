'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import jsPDF from 'jspdf';
import { FileText, Download, Plus, X, Building2, User, Calculator, Upload } from 'lucide-react';
import FormField, { Button, Input, Textarea, Select } from '@/components/ui/FormField';
import ToolLayout from '@/components/layout/ToolLayout';

// Form validation schema
const invoiceSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessEmail: z.string().email('Valid email is required'),
  businessPhone: z.string().min(1, 'Phone number is required'),
  businessAddress: z.string().min(1, 'Business address is required'),
  businessWebsite: z.string().optional(),
  businessTaxId: z.string().optional(),
  businessLogo: z.string().optional(),
  
  clientCompany: z.string().min(1, 'Client company is required'),
  clientContact: z.string().min(1, 'Contact person is required'),
  clientEmail: z.string().email('Valid email is required'),
  clientPhone: z.string().optional(),
  clientAddress: z.string().min(1, 'Client address is required'),
  
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  invoiceDate: z.string().min(1, 'Invoice date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  poNumber: z.string().optional(),
  
  items: z.array(z.object({
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
    unitPrice: z.number().min(0, 'Unit price must be 0 or greater'),
    discount: z.number().min(0).max(100).optional(),
  })).min(1, 'At least one item is required'),
  
  currency: z.string().default('USD'),
  taxType: z.enum(['VAT', 'Sales Tax', 'GST', 'HST', 'Custom']).optional(),
  taxRate: z.number().min(0).max(100).optional(),
  discountType: z.enum(['percentage', 'fixed']).optional(),
  discountAmount: z.number().min(0).optional(),
  depositType: z.enum(['percentage', 'fixed']).optional(),
  depositAmount: z.number().min(0).optional(),
  shippingCost: z.number().min(0).optional(),
  
  notes: z.string().optional(),
  paymentTerms: z.string().optional(),
  bankDetails: z.string().optional(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

const InvoiceGenerator = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      businessName: 'Acme Digital Solutions',
      businessEmail: 'billing@acmedigital.com',
      businessPhone: '+1 (555) 123-4567',
      businessAddress: '123 Business Street\nSuite 100\nSan Francisco, CA 94105\nUnited States',
      businessWebsite: 'www.acmedigital.com',
      businessTaxId: 'EIN: 12-3456789',
      
      clientCompany: 'TechCorp Industries',
      clientContact: 'John Smith',
      clientEmail: 'john.smith@techcorp.com',
      clientPhone: '+1 (555) 987-6543',
      clientAddress: '456 Client Avenue\nFloor 5\nNew York, NY 10001\nUnited States',
      
      invoiceNumber: 'INV-001234',
      invoiceDate: '2024-01-15',
      dueDate: '2024-02-14',
      poNumber: 'PO-2024-001',
      currency: 'USD',
      
      items: [
        { 
          description: 'Website Design & Development - Custom responsive website with modern UI/UX design', 
          quantity: 1, 
          unitPrice: 2500, 
          discount: 0 
        },
        { 
          description: 'SEO Optimization - Complete on-page and technical SEO setup', 
          quantity: 1, 
          unitPrice: 800, 
          discount: 10 
        },
        { 
          description: 'Content Management System Setup - WordPress CMS with custom theme', 
          quantity: 1, 
          unitPrice: 1200, 
          discount: 0 
        }
      ],

      taxType: 'VAT',
      taxRate: 8.5,
      discountType: 'fixed',
      discountAmount: 200,
      depositType: 'percentage',
      depositAmount: 25,
      shippingCost: 0,
      
      notes: 'Thank you for your business! Payment is due within 30 days of invoice date. Please include the invoice number with your payment for faster processing.',
      bankDetails: 'Bank Name: First National Bank\nAccount Number: 123456789\nRouting Number: 987654321\nSWIFT: FNBKUS33',
      paymentTerms: 'Net 30 days',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items');
  const watchedCurrency = watch('currency');
  const watchedTaxType = watch('taxType') || 'VAT';
  const watchedTaxRate = watch('taxRate') || 0;
  const watchedDiscountType = watch('discountType') || 'fixed';
  const watchedDiscountAmount = watch('discountAmount') || 0;
  const watchedDepositType = watch('depositType') || 'percentage';
  const watchedDepositAmount = watch('depositAmount') || 0;
  const watchedShippingCost = watch('shippingCost') || 0;

  // Calculate totals
  const calculations = React.useMemo(() => {
    const lineItems = watchedItems?.map(item => {
      const lineSubtotal = (item.quantity || 0) * (item.unitPrice || 0);
      const discountAmount = (lineSubtotal * (item.discount || 0)) / 100;
      const lineTotal = lineSubtotal - discountAmount;
      return { lineSubtotal, discountAmount, lineTotal };
    }) || [];

    const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);

    // Calculate discount based on type
    const totalDiscount = watchedDiscountType === 'percentage'
      ? (subtotal * watchedDiscountAmount) / 100
      : watchedDiscountAmount;

    const afterDiscount = subtotal - totalDiscount;
    const shippingCost = watchedShippingCost;
    const taxableAmount = afterDiscount + shippingCost;
    const taxAmount = (taxableAmount * watchedTaxRate) / 100;
    const grandTotal = taxableAmount + taxAmount;

    // Calculate deposit based on type
    const depositAmount = watchedDepositType === 'percentage'
      ? (grandTotal * watchedDepositAmount) / 100
      : watchedDepositAmount;

    const remainingBalance = grandTotal - depositAmount;

    return {
      lineItems,
      subtotal,
      totalDiscount,
      afterDiscount,
      shippingCost,
      taxAmount,
      grandTotal,
      depositAmount,
      remainingBalance
    };
  }, [watchedItems, watchedTaxType, watchedTaxRate, watchedDiscountType, watchedDiscountAmount, watchedDepositType, watchedDepositAmount, watchedShippingCost]);

  // Set dynamic dates on client-side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const dueDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    setValue('invoiceDate', today.toISOString().split('T')[0]);
    setValue('dueDate', dueDate.toISOString().split('T')[0]);
    setValue('invoiceNumber', invoiceNumber);
  }, [setValue]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        setValue('businessLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    append({ description: '', quantity: 1, unitPrice: 0, discount: 0 });
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Modern, clean PDF generation with professional design
  const generatePDF = async (data: InvoiceFormData) => {
    setIsGeneratingPDF(true);

    try {
      const doc = new jsPDF();
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15;
      const bottomMargin = 20; // Reserve space at bottom

      // Light, modern color palette
      const colors = {
        primary: [99, 102, 241], // Lighter indigo
        secondary: [148, 163, 184], // Lighter slate
        accent: [34, 197, 94], // Lighter green
        text: [51, 65, 85], // Lighter dark text (slate 600)
        lightText: [148, 163, 184], // Lighter gray text (slate 400)
        background: [250, 250, 250], // Very light gray
        border: [241, 245, 249], // Very light border (slate 100)
        white: [255, 255, 255]
      };

      let currentY = 25;

      // Helper function to check if we need a new page
      const checkPageBreak = (requiredSpace: number) => {
        if (currentY + requiredSpace > pageHeight - bottomMargin) {
          doc.addPage();
          currentY = margin + 10; // Start with some top margin on new page
          return true;
        }
        return false;
      };

      // Modern Header Design with better spacing
      // Company Logo and Info (Left side) - Refined spacing
      doc.setTextColor(...colors.text);
      if (logoPreview) {
        try {
          doc.addImage(logoPreview, 'JPEG', margin, currentY, 18, 18);
          // Company name - Modern, clean font with better spacing
          doc.setFontSize(15);
          doc.setFont('helvetica', 'bold');
          doc.text(data.businessName, margin + 22, currentY + 7);

          // Company details - Better spaced, lighter
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(...colors.lightText);

          let detailY = currentY + 14;
          if (data.businessAddress) {
            const addressLines = data.businessAddress.split('\n').filter(line => line.trim());
            addressLines.slice(0, 2).forEach((line, index) => {
              doc.text(line.trim(), margin + 22, detailY + (index * 3.5));
            });
            detailY += 7;
          }

          if (data.businessPhone) {
            doc.text(`${data.businessPhone}`, margin + 22, detailY);
            detailY += 3.5;
          }

          if (data.businessEmail) {
            doc.text(`${data.businessEmail}`, margin + 22, detailY);
          }

        } catch (e) {
          console.log('Logo could not be added');
          // Fallback without logo - better spacing
          doc.setFontSize(17);
          doc.setFont('helvetica', 'bold');
          doc.text(data.businessName, margin, currentY + 7);
        }
      } else {
        // No logo - clean company info with better spacing
        doc.setFontSize(17);
        doc.setFont('helvetica', 'bold');
        doc.text(data.businessName, margin, currentY + 7);

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.lightText);

        let detailY = currentY + 16;
        if (data.businessAddress) {
          const addressLines = data.businessAddress.split('\n').filter(line => line.trim());
          addressLines.slice(0, 2).forEach((line, index) => {
            doc.text(line.trim(), margin, detailY + (index * 3.5));
          });
          detailY += 7;
        }

        if (data.businessPhone) {
          doc.text(`${data.businessPhone}`, margin, detailY);
          detailY += 3.5;
        }

        if (data.businessEmail) {
          doc.text(`${data.businessEmail}`, margin, detailY);
        }
      }

      // Modern INVOICE Title (Right side) - lighter and better positioned
      doc.setTextColor(...colors.primary);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE', pageWidth - margin, currentY + 10, { align: 'right' });

      // Clean invoice details (right side) - improved spacing
      const infoBoxX = pageWidth - 55;
      const infoBoxY = currentY + 20;

      doc.setTextColor(...colors.lightText);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');

      doc.text('Invoice #', infoBoxX, infoBoxY);
      doc.setTextColor(...colors.text);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(data.invoiceNumber, pageWidth - margin, infoBoxY, { align: 'right' });

      doc.setTextColor(...colors.lightText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Date', infoBoxX, infoBoxY + 6);
      doc.setTextColor(...colors.text);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      if (data.invoiceDate) {
        const issueDate = new Date(data.invoiceDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        doc.text(issueDate, pageWidth - margin, infoBoxY + 6, { align: 'right' });
      }

      doc.setTextColor(...colors.lightText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Due', infoBoxX, infoBoxY + 12);
      doc.setTextColor(...colors.text);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      if (data.dueDate) {
        const dueDate = new Date(data.dueDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        doc.text(dueDate, pageWidth - margin, infoBoxY + 12, { align: 'right' });
      }

      currentY = 65;

      // Modern Bill To section with improved spacing
      currentY += 15;

      // Calculate the height needed for Bill To section
      let billToHeight = 8; // Header space
      billToHeight += 7; // Company name space

      if (data.clientContact) {
        billToHeight += 4;
      }

      if (data.clientAddress) {
        const clientLines = data.clientAddress.split('\n').filter(line => line.trim());
        billToHeight += clientLines.length * 3.5;
      }

      if (data.clientEmail) {
        billToHeight += 4;
      }

      if (data.clientPhone) {
        billToHeight += 4;
      }

      billToHeight += 8; // Bottom padding

      // Very subtle background for Bill To section with dynamic height
      doc.setFillColor(...colors.background);
      doc.rect(margin, currentY, pageWidth - 2 * margin, billToHeight, 'F');

      // Bill To header - Lighter, better spaced
      doc.setTextColor(...colors.primary);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('BILL TO', margin + 4, currentY + 8);

      currentY += 14;

      // Client company name - Clean and prominent with better spacing
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.text);
      doc.text(data.clientCompany, margin + 4, currentY);

      currentY += 7;

      // Client contact details - Better spaced and lighter
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.lightText);

      if (data.clientContact) {
        doc.text(data.clientContact, margin + 4, currentY);
        currentY += 4;
      }

      if (data.clientAddress) {
        const clientLines = data.clientAddress.split('\n').filter(line => line.trim());
        clientLines.forEach((line, index) => {
          doc.text(line.trim(), margin + 4, currentY + (index * 3.5));
        });
        currentY += clientLines.length * 3.5;
      }

      if (data.clientEmail) {
        doc.text(data.clientEmail, margin + 4, currentY);
        currentY += 4;
      }

      if (data.clientPhone) {
        doc.text(data.clientPhone, margin + 4, currentY);
        currentY += 4;
      }

      currentY += 12;

      // Check if we need a new page for the table
      checkPageBreak(50); // Reserve space for table header and some rows

      // Modern Items Table with improved spacing
      const tableStartY = currentY;
      const descCol = margin;
      const qtyCol = margin + 115;
      const rateCol = margin + 145;
      const amountCol = pageWidth - margin;

      // Lighter table header
      doc.setFillColor(...colors.background);
      doc.rect(margin, currentY, pageWidth - 2 * margin, 10, 'F');

      // Subtle border for header
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.5);
      doc.rect(margin, currentY, pageWidth - 2 * margin, 10);

      // Table header text - Lighter, better spaced
      doc.setTextColor(...colors.text);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');

      doc.text('DESCRIPTION', descCol + 3, currentY + 6);
      doc.text('QTY', qtyCol + 3, currentY + 6);
      doc.text('RATE', rateCol + 3, currentY + 6);
      doc.text('AMOUNT', amountCol - 3, currentY + 6, { align: 'right' });

      currentY += 10;

      // Modern table rows with improved spacing and lighter colors
      if (data.items && data.items.length > 0) {
        data.items.forEach((item, index) => {
          const description = item.description || 'No description';
          const descriptionLines = doc.splitTextToSize(description, 105);
          const rowHeight = Math.max(9, descriptionLines.length * 4 + 5);

          // Check if this row will fit on current page
          if (checkPageBreak(rowHeight + 5)) {
            // If we added a new page, redraw table header
            doc.setFillColor(...colors.background);
            doc.rect(margin, currentY, pageWidth - 2 * margin, 10, 'F');

            doc.setDrawColor(...colors.border);
            doc.setLineWidth(0.5);
            doc.rect(margin, currentY, pageWidth - 2 * margin, 10);

            doc.setTextColor(...colors.text);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');

            doc.text('DESCRIPTION', descCol + 3, currentY + 6);
            doc.text('QTY', qtyCol + 3, currentY + 6);
            doc.text('RATE', rateCol + 3, currentY + 6);
            doc.text('AMOUNT', amountCol - 3, currentY + 6, { align: 'right' });

            currentY += 10;
          }

          // Very subtle alternating row background
          if (index % 2 === 1) {
            doc.setFillColor(252, 252, 252); // Even lighter gray
            doc.rect(margin, currentY, pageWidth - 2 * margin, rowHeight, 'F');
          }

          doc.setTextColor(...colors.text);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');

          // Description - Better spaced
          doc.text(descriptionLines, descCol + 3, currentY + 5);

          // Quantity - Better centered and spaced
          doc.setFont('helvetica', 'normal');
          doc.text((item.quantity || 0).toString(), qtyCol + 10, currentY + 5, { align: 'center' });

          // Unit Price - Better spacing
          doc.text(formatCurrency(item.unitPrice || 0, data.currency), rateCol + 3, currentY + 5);

          // Line Total - Better emphasized
          const lineSubtotal = (item.quantity || 0) * (item.unitPrice || 0);
          const discountAmount = (lineSubtotal * (item.discount || 0)) / 100;
          const lineTotal = lineSubtotal - discountAmount;

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.text(formatCurrency(lineTotal, data.currency), amountCol - 3, currentY + 5, { align: 'right' });

          // Very subtle row separator
          doc.setDrawColor(...colors.border);
          doc.setLineWidth(0.2);
          doc.line(margin, currentY + rowHeight, pageWidth - margin, currentY + rowHeight);

          currentY += rowHeight;
        });
      }

      // Clean table border
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.5);
      doc.line(margin, currentY, pageWidth - margin, currentY);

      // Check if we need a new page for totals section
      checkPageBreak(60); // Reserve space for totals

      // Modern Totals Section with improved spacing
      currentY += 18;

      const totalsBoxX = pageWidth - 70;
      const totalsBoxY = currentY;
      const totalsBoxWidth = 55;
      let totalsHeight = 0;

      // Calculate totals box height with better spacing
      let totalLines = 1; // Subtotal
      if (data.discountAmount && data.discountAmount > 0) totalLines++;
      if (data.shippingCost && data.shippingCost > 0) totalLines++;
      if (data.taxRate && data.taxRate > 0) totalLines++;
      totalLines++; // Grand total
      totalsHeight = totalLines * 6 + 12;

      // Very subtle totals background
      doc.setFillColor(...colors.background);
      doc.rect(totalsBoxX, totalsBoxY, totalsBoxWidth, totalsHeight, 'F');

      // Lighter border
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.5);
      doc.rect(totalsBoxX, totalsBoxY, totalsBoxWidth, totalsHeight);

      currentY += 6;
      const labelX = totalsBoxX + 3;
      const valueX = totalsBoxX + totalsBoxWidth - 3;

      // Subtotal - Better spaced
      doc.setTextColor(...colors.lightText);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Subtotal:', labelX, currentY);
      doc.setTextColor(...colors.text);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(formatCurrency(calculations.subtotal, data.currency), valueX, currentY, { align: 'right' });
      currentY += 6;

      // Discount
      if (calculations.totalDiscount > 0) {
        doc.setTextColor(...colors.lightText);
        doc.setFont('helvetica', 'normal');
        const discountLabel = data.discountType === 'percentage'
          ? `Discount (${data.discountAmount}%):`
          : 'Discount:';
        doc.text(discountLabel, labelX, currentY);
        doc.setTextColor(...colors.text);
        doc.setFont('helvetica', 'bold');
        doc.text(`-${formatCurrency(calculations.totalDiscount, data.currency)}`, valueX, currentY, { align: 'right' });
        currentY += 6;
      }

      // Shipping
      if (data.shippingCost && data.shippingCost > 0) {
        doc.setTextColor(...colors.lightText);
        doc.setFont('helvetica', 'normal');
        doc.text('Shipping:', labelX, currentY);
        doc.setTextColor(...colors.text);
        doc.setFont('helvetica', 'bold');
        doc.text(formatCurrency(data.shippingCost, data.currency), valueX, currentY, { align: 'right' });
        currentY += 6;
      }

      // Tax
      if (data.taxRate && data.taxRate > 0) {
        doc.setTextColor(...colors.lightText);
        doc.setFont('helvetica', 'normal');
        const taxLabel = data.taxType ? `${data.taxType} (${data.taxRate}%):` : `Tax (${data.taxRate}%):`;
        doc.text(taxLabel, labelX, currentY);
        doc.setTextColor(...colors.text);
        doc.setFont('helvetica', 'bold');
        doc.text(formatCurrency(calculations.taxAmount, data.currency), valueX, currentY, { align: 'right' });
        currentY += 6;
      }

      // Lighter separator line
      doc.setDrawColor(...colors.lightText);
      doc.setLineWidth(0.3);
      doc.line(labelX, currentY + 2, valueX, currentY + 2);
      currentY += 6;

      // Grand Total - Lighter, more elegant
      doc.setFillColor(...colors.primary);
      doc.rect(totalsBoxX, currentY - 2, totalsBoxWidth, 8, 'F');

      doc.setTextColor(...colors.white);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL:', labelX, currentY + 2);
      doc.setFontSize(10);
      doc.text(formatCurrency(calculations.grandTotal, data.currency), valueX, currentY + 2, { align: 'right' });

      currentY += 15;

      // Deposit Information (if applicable)
      if (data.depositAmount && data.depositAmount > 0) {
        // Deposit section background
        doc.setFillColor(...colors.background);
        doc.rect(totalsBoxX, currentY, totalsBoxWidth, 16, 'F');

        // Deposit border
        doc.setDrawColor(...colors.border);
        doc.setLineWidth(0.3);
        doc.rect(totalsBoxX, currentY, totalsBoxWidth, 16);

        currentY += 4;

        // Deposit amount
        doc.setTextColor(...colors.lightText);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        const depositLabel = data.depositType === 'percentage'
          ? `Deposit (${data.depositAmount}%):`
          : 'Deposit:';
        doc.text(depositLabel, labelX, currentY);
        doc.setTextColor(...colors.text);
        doc.setFont('helvetica', 'bold');
        doc.text(formatCurrency(calculations.depositAmount, data.currency), valueX, currentY, { align: 'right' });
        currentY += 6;

        // Remaining balance
        doc.setTextColor(...colors.lightText);
        doc.setFont('helvetica', 'normal');
        doc.text('Balance Due:', labelX, currentY);
        doc.setTextColor(...colors.primary);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(formatCurrency(calculations.remainingBalance, data.currency), valueX, currentY, { align: 'right' });

        currentY += 10;
      } else {
        currentY += 5;
      }

      // Modern Notes Section with better spacing
      if (data.notes) {
        const noteLines = doc.splitTextToSize(data.notes, pageWidth - 2 * margin);
        const notesHeight = 8 + (noteLines.length * 4) + 12; // Header + content + spacing

        // Check if notes section will fit
        checkPageBreak(notesHeight);

        doc.setTextColor(...colors.primary);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('NOTES', margin, currentY);

        currentY += 8;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.lightText);

        noteLines.slice(0, 4).forEach((line: string, index: number) => {
          // Check if each line will fit
          if (checkPageBreak(4)) {
            // If we moved to new page, redraw the notes header
            doc.setTextColor(...colors.primary);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.text('NOTES (continued)', margin, currentY);
            currentY += 8;
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...colors.lightText);
          }
          doc.text(line, margin, currentY + (index * 4));
        });

        currentY += noteLines.length * 4 + 12;
      }

      // Modern Bank Details Section with better spacing
      if (data.bankDetails) {
        const bankLines = data.bankDetails.split('\n').filter(line => line.trim());
        const bankDetailsHeight = 8 + (bankLines.length * 4) + 15; // Header + content + spacing

        // Check if bank details section will fit
        checkPageBreak(bankDetailsHeight);

        doc.setTextColor(...colors.primary);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('PAYMENT INFORMATION', margin, currentY);

        currentY += 8;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.lightText);

        bankLines.forEach((line, index) => {
          // Check if each line will fit
          if (checkPageBreak(4)) {
            // If we moved to new page, redraw the bank details header
            doc.setTextColor(...colors.primary);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.text('PAYMENT INFORMATION (continued)', margin, currentY);
            currentY += 8;
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...colors.lightText);
          }
          doc.text(line.trim(), margin, currentY + (index * 4));
        });

        currentY += bankLines.length * 4 + 15;
      }

      // Modern Footer with better spacing - always ensure it fits
      const footerHeight = 15;
      checkPageBreak(footerHeight);

      // Position footer with proper spacing
      const footerY = Math.max(currentY + 10, pageHeight - bottomMargin);

      // Very subtle footer line
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.3);
      doc.line(margin, footerY - 8, pageWidth - margin, footerY - 8);

      doc.setTextColor(...colors.lightText);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text('Thank you for your business!', pageWidth / 2, footerY, { align: 'center' });

      // Save PDF
      const filename = `Invoice-${data.invoiceNumber || 'Draft'}.pdf`;
      doc.save(filename);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const onSubmit = async (data: InvoiceFormData) => {
    await generatePDF(data);
  };

  const relatedTools = [
    {
      title: 'Receipt Generator',
      href: '/receipt-generator',
      description: 'Create professional receipts for transactions',
    },
    {
      title: 'Expense Tracker',
      href: '/expense-tracker',
      description: 'Track and categorize business expenses',
    },
    {
      title: 'Tax Calculator',
      href: '/tax-calculator',
      description: 'Calculate taxes for different regions',
    },
    {
      title: 'Interest Calculator',
      href: '/interest-calculator',
      description: 'Calculate compound interest and returns',
    },
  ];

  return (
    <ToolLayout
      title="Professional Invoice Generator - Create Business Invoices"
      description="Generate professional invoices with advanced features: multi-currency support, logo upload, itemized billing, tax calculations, and instant PDF download. Perfect for businesses of all sizes."
      slug="invoice-generator"
      keywords={['professional invoice generator', 'business invoice maker', 'invoice template', 'PDF invoice', 'freelancer billing', 'business invoicing']}
      relatedTools={relatedTools}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FileText className="h-8 w-8" />
              Professional Invoice Generator
            </h1>
            <p className="text-blue-100 mt-2">Create stunning, professional invoices in seconds</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">

            {/* Business Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                Business Information
              </h2>

              {/* Logo Upload */}
              <div className="bg-gray-50 rounded-xl p-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">Company Logo</label>
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    {logoPreview ? (
                      <div className="relative">
                        <img src={logoPreview} alt="Logo preview" className="h-20 w-20 object-contain border-2 border-gray-200 rounded-lg bg-white p-2" />
                        <button
                          type="button"
                          onClick={() => {
                            setLogoPreview(null);
                            setValue('businessLogo', '');
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="h-20 w-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Company Name" required error={errors.businessName}>
                  <Input
                    {...register('businessName')}
                    placeholder="Acme Corporation"
                    error={!!errors.businessName}
                  />
                </FormField>

                <FormField label="Email Address" required error={errors.businessEmail}>
                  <Input
                    type="email"
                    {...register('businessEmail')}
                    placeholder="billing@acmecorp.com"
                    error={!!errors.businessEmail}
                  />
                </FormField>

                <FormField label="Phone Number" required error={errors.businessPhone}>
                  <Input
                    {...register('businessPhone')}
                    placeholder="+1 (555) 123-4567"
                    error={!!errors.businessPhone}
                  />
                </FormField>

                <FormField label="Website" error={errors.businessWebsite}>
                  <Input
                    {...register('businessWebsite')}
                    placeholder="www.acmecorp.com"
                    error={!!errors.businessWebsite}
                  />
                </FormField>

                <FormField label="Business Address" required error={errors.businessAddress}>
                  <Textarea
                    {...register('businessAddress')}
                    rows={3}
                    placeholder="123 Business Street&#10;Suite 100&#10;City, State 12345"
                    error={!!errors.businessAddress}
                  />
                </FormField>

                <FormField label="Tax ID / VAT Number" error={errors.businessTaxId}>
                  <Input
                    {...register('businessTaxId')}
                    placeholder="12-3456789"
                    error={!!errors.businessTaxId}
                  />
                </FormField>
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <User className="h-6 w-6 text-green-600" />
                Client Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Client Company" required error={errors.clientCompany}>
                  <Input
                    {...register('clientCompany')}
                    placeholder="Client Corporation Ltd."
                    error={!!errors.clientCompany}
                  />
                </FormField>

                <FormField label="Contact Person" required error={errors.clientContact}>
                  <Input
                    {...register('clientContact')}
                    placeholder="John Smith"
                    error={!!errors.clientContact}
                  />
                </FormField>

                <FormField label="Email Address" required error={errors.clientEmail}>
                  <Input
                    type="email"
                    {...register('clientEmail')}
                    placeholder="john@clientcorp.com"
                    error={!!errors.clientEmail}
                  />
                </FormField>

                <FormField label="Phone Number" error={errors.clientPhone}>
                  <Input
                    {...register('clientPhone')}
                    placeholder="+1 (555) 987-6543"
                    error={!!errors.clientPhone}
                  />
                </FormField>

                <FormField label="Client Address" required error={errors.clientAddress}>
                  <Textarea
                    {...register('clientAddress')}
                    rows={3}
                    placeholder="456 Client Avenue&#10;Floor 5&#10;Client City, State 67890"
                    error={!!errors.clientAddress}
                  />
                </FormField>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="h-6 w-6 text-purple-600" />
                Invoice Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField label="Invoice Number" required error={errors.invoiceNumber}>
                  <Input
                    {...register('invoiceNumber')}
                    placeholder="INV-001"
                    error={!!errors.invoiceNumber}
                  />
                </FormField>

                <FormField label="Invoice Date" required error={errors.invoiceDate}>
                  <Input
                    type="date"
                    {...register('invoiceDate')}
                    error={!!errors.invoiceDate}
                  />
                </FormField>

                <FormField label="Due Date" required error={errors.dueDate}>
                  <Input
                    type="date"
                    {...register('dueDate')}
                    error={!!errors.dueDate}
                  />
                </FormField>

                <FormField label="Currency" error={errors.currency}>
                  <Select
                    {...register('currency')}
                    options={[
                      { value: 'USD', label: 'USD ($)' },
                      { value: 'EUR', label: 'EUR (€)' },
                      { value: 'GBP', label: 'GBP (£)' },
                      { value: 'CAD', label: 'CAD ($)' },
                      { value: 'AUD', label: 'AUD ($)' },
                    ]}
                    error={!!errors.currency}
                  />
                </FormField>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-orange-600" />
                  Invoice Items
                </h2>
                <Button type="button" onClick={addItem} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Item {index + 1}</h3>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="lg:col-span-2">
                        <FormField label="Description" required error={errors.items?.[index]?.description}>
                          <Input
                            {...register(`items.${index}.description` as const)}
                            placeholder="Product or service description"
                            error={!!errors.items?.[index]?.description}
                          />
                        </FormField>
                      </div>

                      <FormField label="Quantity" required error={errors.items?.[index]?.quantity}>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                          placeholder="1"
                          error={!!errors.items?.[index]?.quantity}
                        />
                      </FormField>

                      <FormField label="Unit Price" required error={errors.items?.[index]?.unitPrice}>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...register(`items.${index}.unitPrice` as const, { valueAsNumber: true })}
                          placeholder="0.00"
                          error={!!errors.items?.[index]?.unitPrice}
                        />
                      </FormField>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Line Total: {formatCurrency(
                          ((watchedItems[index]?.quantity || 0) * (watchedItems[index]?.unitPrice || 0)) *
                          (1 - (watchedItems[index]?.discount || 0) / 100),
                          watchedCurrency
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="h-6 w-6 text-emerald-600" />
                Calculations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Shipping Cost" error={errors.shippingCost}>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('shippingCost', { valueAsNumber: true })}
                    placeholder="0.00"
                    error={!!errors.shippingCost}
                  />
                </FormField>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-900 mb-2">Grand Total</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(calculations.grandTotal, watchedCurrency)}
                  </div>
                </div>
              </div>

              {/* Discount Section */}
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-orange-900 mb-4">Discount Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField label="Discount Type" error={errors.discountType}>
                    <Select
                      {...register('discountType')}
                      options={[
                        { value: 'fixed', label: 'Fixed Amount' },
                        { value: 'percentage', label: 'Percentage' },
                      ]}
                      error={!!errors.discountType}
                    />
                  </FormField>

                  <FormField label={`Discount ${watchedDiscountType === 'percentage' ? '(%)' : `(${watchedCurrency})`}`} error={errors.discountAmount}>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max={watchedDiscountType === 'percentage' ? "100" : undefined}
                      {...register('discountAmount', { valueAsNumber: true })}
                      placeholder={watchedDiscountType === 'percentage' ? "10" : "100.00"}
                      error={!!errors.discountAmount}
                    />
                  </FormField>

                  <div className="bg-orange-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-orange-900 mb-1">Discount Amount</div>
                    <div className="text-lg font-bold text-orange-700">
                      -{formatCurrency(calculations.totalDiscount, watchedCurrency)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Section */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-900 mb-4">Tax Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField label="Tax Type" error={errors.taxType}>
                    <Select
                      {...register('taxType')}
                      options={[
                        { value: 'VAT', label: 'VAT (Value Added Tax)' },
                        { value: 'Sales Tax', label: 'Sales Tax' },
                        { value: 'GST', label: 'GST (Goods & Services Tax)' },
                        { value: 'HST', label: 'HST (Harmonized Sales Tax)' },
                        { value: 'Custom', label: 'Custom Tax' },
                      ]}
                      error={!!errors.taxType}
                    />
                  </FormField>

                  <FormField label="Tax Rate (%)" error={errors.taxRate}>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      {...register('taxRate', { valueAsNumber: true })}
                      placeholder="8.5"
                      error={!!errors.taxRate}
                    />
                  </FormField>

                  <div className="bg-purple-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-purple-900 mb-1">Tax Amount</div>
                    <div className="text-lg font-bold text-purple-700">
                      {formatCurrency(calculations.taxAmount, watchedCurrency)}
                    </div>
                  </div>

                  <div className="bg-purple-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-purple-900 mb-1">Tax Type</div>
                    <div className="text-lg font-bold text-purple-800">
                      {watchedTaxType}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deposit Section */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-900 mb-4">Deposit Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField label="Deposit Type" error={errors.depositType}>
                    <Select
                      {...register('depositType')}
                      options={[
                        { value: 'percentage', label: 'Percentage' },
                        { value: 'fixed', label: 'Fixed Amount' },
                      ]}
                      error={!!errors.depositType}
                    />
                  </FormField>

                  <FormField label={`Deposit ${watchedDepositType === 'percentage' ? '(%)' : `(${watchedCurrency})`}`} error={errors.depositAmount}>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max={watchedDepositType === 'percentage' ? "100" : undefined}
                      {...register('depositAmount', { valueAsNumber: true })}
                      placeholder={watchedDepositType === 'percentage' ? "25" : "500.00"}
                      error={!!errors.depositAmount}
                    />
                  </FormField>

                  <div className="bg-green-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-900 mb-1">Deposit Amount</div>
                    <div className="text-lg font-bold text-green-700">
                      {formatCurrency(calculations.depositAmount, watchedCurrency)}
                    </div>
                  </div>

                  <div className="bg-green-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-900 mb-1">Remaining Balance</div>
                    <div className="text-lg font-bold text-green-800">
                      {formatCurrency(calculations.remainingBalance, watchedCurrency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Additional Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Invoice Notes" error={errors.notes}>
                  <Textarea
                    {...register('notes')}
                    rows={4}
                    placeholder="Thank you for your business! Payment is due within the specified terms."
                    error={!!errors.notes}
                  />
                </FormField>

                <FormField label="Bank Details (Optional)" error={errors.bankDetails}>
                  <Textarea
                    {...register('bankDetails')}
                    rows={4}
                    placeholder="Bank Name: First National Bank&#10;Account Number: 123456789&#10;Routing Number: 987654321"
                    error={!!errors.bankDetails}
                  />
                </FormField>
              </div>
            </div>

            {/* Generate Button */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Generate Your Invoice?</h3>
              <p className="text-blue-100 mb-6">Create a professional, branded PDF invoice in seconds</p>

              <Button
                type="submit"
                disabled={isGeneratingPDF}
                variant="outline"
                className="!bg-white !text-blue-700 hover:!bg-blue-50 !border-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
                size="lg"
              >
                {isGeneratingPDF ? (
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700"></div>
                    <span>Generating PDF...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Download className="h-6 w-6" />
                    <span>Generate Professional Invoice PDF</span>
                  </div>
                )}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </ToolLayout>
  );
};

export default InvoiceGenerator;
